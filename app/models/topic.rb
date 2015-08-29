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
        timeline_array[index][c.state] = chunk
      end
    end
    return timeline_array
  end

end
