class Topic < ActiveRecord::Base
  has_many :charts
  has_many :responses, through: :charts

  validates_presence_of :name

  include ResponsesHelper

  def responses_json
    timeline_array = Array.new(30) { Hash.new }
    self.charts.each do |c|
      response_chunks = bucketize_responses(c.responses)
      response_chunks.each_with_index do |chunk, index|
        sorted_chunk = chunk.sort_by { |r| r.percentage }
        timeline_array[index][c.state] = { responses: chunk, # fillKey: sorted_chunk.last.answer
         }
      end
    end
    return timeline_array
  end

end
