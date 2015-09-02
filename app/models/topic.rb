class Topic < ActiveRecord::Base
  has_many :charts
  has_many :responses, through: :charts

  validates_presence_of :name

  include ResponsesHelper

  def file_path
    "db/data-files/topic_#{self.id}.json"
  end

  def get_responses_json
    if File.exist?(self.file_path)
      file = File.open(self.file_path)
      return file.read
    else
      file = File.new(self.file_path, 'wb')
      responses = (self.id == 1 ? self.responses_json_obama_approval : self.responses_json)
      file.write(responses.to_json)
      return responses
    end
  end

  # This is slower than directly storing the files on disk, because Rails only stores the database queries in the cache.
  # It doesn't directly store the results of the method calls. It still takes about 5 seconds to processing the cached database
  # data. With our homebrew disk-caching method above, the return is nearly instantaneous. However, using the Rails cache does
  # have the advantage of being managed by Rails, obviating the need for any messy file I/O.
  def get_responses_json_from_memory_cache
    Rails.cache.fetch("responses/#{self.id}", expires_in: 12.hours) do
      if self.id == 1
        self.responses_json_obama_approval
      else
        self.responses_json
      end
    end
  end

  def responses_json_obama_approval
    timeline_array = Array.new(30) { Hash.new }
    self.charts.each do |c|
      response_chunks = bucketize_responses(c.responses)
      response_chunks.each_with_index do |chunk, index|
        sorted_chunk = chunk.sort_by { |r| r.percentage }
        timeline_array[index][c.state] = { responses: chunk }
      end
    end
    return [timeline_array, self.all_national_responses_obama_approval]
  end

  def all_national_responses_obama_approval
    all = self.charts.where(state: "US").first.responses.pluck(:answer).uniq.sort
    p "YO!! " * 111
    p all
    return all.map { |choice| {attributes: {answer: choice, responses: self.responses.where(answer: choice).order("date ASC").reject { |r| r.id % 20 != 0 } } } }
  end

  def responses_json
    candidates = self.responses.pluck(:answer).uniq.reject { |c| c == "Refused" }.sort
    ["Neither","No Opinion","Neutral","Not Heard Enough"].each do |word|
      if candidates.include?(word)
        candidates.push(candidates.delete(word))
      end
    end
    ["Wrong Track", "Unfavorable"].each do |word|
      candidates.insert(1, candidates.delete(word)) if candidates.include?(word)
    end
    return candidates.map { |choice| { answer: choice, responses: self.responses.where(answer: choice).order("date ASC") } }
  end

end
