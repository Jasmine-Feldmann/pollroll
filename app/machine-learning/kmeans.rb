require 'csv'

NUMBER_OF_CENTROIDS = 2

def date_to_days_in_office(date)
  (Date.parse(date) - Date.new(2009,1,1)).to_i
end

def vectorize_row(row)
  [row[2].to_f, row[3].gsub(",", "").to_f]
  # [date_to_days_in_office(row[0]), row[2].to_f]
end

def compute_distance(centroid, data)
  Math.sqrt((centroid[0] - data[0])**2 + (centroid[1] - data[1])**2)
end

def random_centroid(x_max, y_max)
  [rand * x_max, rand * y_max]
end

row_vectors = []
vector_ratings = []

CSV.foreach('obama_data_train.csv') do |row|
  vector = vectorize_row(row)
  row_vectors << vector
  vector_ratings << row[1]
end

x_max = row_vectors.max_by { |vector| vector[0] }.first
y_max = row_vectors.max_by { |vector| vector[1] }.last

# Generate centroids
centroids = Array.new(NUMBER_OF_CENTROIDS) { random_centroid(x_max, y_max) }
old_centroids = []

until centroids == old_centroids
  old_centroids = centroids.map { |vec| vec.dup }

  # Compute the distance of each vector to each centroid
  # Assign each vector to the closest centroid
  vector_centroids = row_vectors.map.with_index do |rv, i|
    { vector: rv, centroid: centroids.min_by { |centroid| compute_distance(centroid, rv) } }
  end

  # Recalculate each centroid's position to minimize the distance
  centroid_vectors = centroids.map { |c| vector_centroids.select { |rv| rv[:centroid] == c } }

  centroid_vectors.each_with_index do |vectors, index|
    if vectors.length > 0
      new_x = vectors.reduce(0) { |acc, v| acc + v[:vector][0] } / vectors.length
      new_y = vectors.reduce(0) { |acc, v| acc + v[:vector][1] } / vectors.length
      centroids[index] = [new_x, new_y]
    else
      centroids[index] = random_centroid(x_max, y_max)
    end
  end
end

training_results = []

vector_centroids.each_with_index do |vc, i|
  puts "TRAIN: Closest centroid for vector #{vc[:vector]}:"
  p vc[:centroid]
  puts "Corresponding approval value: #{vector_ratings[i]}"
  training_results << [vc[:vector][0], vc[:vector][1], vector_ratings[i], vc[:centroid]]
end

test_results = []

CSV.foreach('obama_data_test.csv') do |row|
  vector = vectorize_row(row)
  closest_centroid = centroids.min_by { |centroid| compute_distance(centroid, vector) }
  puts "--------------------------------------------"
  puts "TEST: Closest centroid for vector #{vector}:"
  p closest_centroid
  puts "Corresponding approval value: #{row[1]}"
  test_results << [vector[0], vector[1], row[1], closest_centroid]
end

centroids.each_with_index do |centroid, i|
  cluster = vector_centroids.select { |vc| vc[:centroid] == centroid }.map { |v| v[:vector] }
  ratings = cluster.map { |vec| vector_ratings[row_vectors.index(vec)].to_i }
  puts "-------------------------------------"
  puts "Average approval rating for centroid:"
  p centroid
  puts ratings.reduce(:+).to_f / ratings.length
end

CSV.open('kmeans_training_results.csv', 'wb') do |csv|
  training_results.each { |result| csv << result }
end

CSV.open('kmeans_test_results.csv', 'wb') do |csv|
  test_results.each { |result| csv << result }
end
