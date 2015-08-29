module ResponsesHelper

  NUMBER_OF_RESPONSE_CHUNKS = 30

  def calculate_chunk_size(response_count)
    (response_count.to_f / NUMBER_OF_RESPONSE_CHUNKS).ceil.to_i
  end

  def bucketize_responses(responses)
    chunk_size = calculate_chunk_size(responses.length / 3)
    sorted_responses = responses.sort { |r1, r2| r2.date.to_date <=> r1.date.to_date }
    approve_buckets = sorted_responses.select { |r| r.answer == "Approve" }.each_slice(chunk_size).map { |chunk| bucketize_response_chunk(chunk) }
    disapprove_buckets = sorted_responses.select { |r| r.answer == "Disapprove" }.each_slice(chunk_size).map { |chunk| bucketize_response_chunk(chunk) }
    undecided_buckets = sorted_responses.select { |r| r.answer == "Undecided" }.each_slice(chunk_size).map { |chunk| bucketize_response_chunk(chunk) }
    zipped_buckets = approve_buckets.zip(disapprove_buckets, undecided_buckets)
    if zipped_buckets.length < NUMBER_OF_RESPONSE_CHUNKS
      (NUMBER_OF_RESPONSE_CHUNKS - zipped_buckets.length).times do
        zipped_buckets.push(zipped_buckets.last)
      end
      return zipped_buckets
    else
      return zipped_buckets[0..NUMBER_OF_RESPONSE_CHUNKS-1]
    end
  end

  def bucketize_response_chunk(response_chunk)
    average = response_chunk.reduce(0) { |acc, resp| acc + resp.percentage } / response_chunk.length
    date_diff = response_chunk.last.date.to_date - response_chunk.first.date.to_date
    new_date = response_chunk.first.date.to_date + (date_diff / 2)
    Response.new(answer: response_chunk.first.answer, date: new_date.to_s, percentage: average, chart_id: response_chunk.first.chart_id)
  end

end
