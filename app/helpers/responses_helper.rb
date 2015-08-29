module ResponsesHelper

  NUMBER_OF_RESPONSE_CHUNKS = 20

  def calculate_chunk_size(response_count)
    (response_count.to_f / NUMBER_OF_RESPONSE_CHUNKS).ceil.to_i
  end

  def bucketize_responses(responses)
    chunk_size = calculate_chunk_size(responses.length)
    approve_buckets = responses.where(answer: "Approve").order("date ASC").each_slice(chunk_size).map { |chunk| bucketize_response_chunk(chunk) }
    disapprove_buckets = responses.where(answer: "Disapprove").order("date ASC").each_slice(chunk_size).map { |chunk| bucketize_response_chunk(chunk) }
    undecided_buckets = responses.where(answer: "Undecided").order("date ASC").each_slice(chunk_size).map { |chunk| bucketize_response_chunk(chunk) }
    return approve_buckets.zip(disapprove_buckets, undecided_buckets)
  end

  def bucketize_response_chunk(response_chunk)
    average = response_chunk.reduce(0) { |acc, resp| acc + resp.percentage } / response_chunk.length
    date_diff = response_chunk.last.date.to_date - response_chunk.first.date.to_date
    new_date = response_chunk.first.date.to_date + (date_diff / 2)
    Response.new(answer: response_chunk.first.answer, date: new_date.to_s, percentage: average, chart_id: response_chunk.first.chart_id)
  end

end
