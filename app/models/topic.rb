class Topic < ActiveRecord::Base
  has_many :charts
  has_many :responses, through: :charts

  validates_presence_of :name

  include ResponsesHelper

  def responses_json_obama_approval
    timeline_array = Array.new(30) { Hash.new }
    self.charts.each do |c|
      response_chunks = bucketize_responses(c.responses)
      response_chunks.each_with_index do |chunk, index|
        sorted_chunk = chunk.sort_by { |r| r.percentage }
        timeline_array[index][c.state] = { responses: chunk, fillKey: sorted_chunk.last.answer }
      end
    end
    return [timeline_array, self.all_national_responses_obama_approval]
  end

  def all_national_responses_obama_approval
    all = self.charts.where(state: "US").first.responses.each_slice(3).map do |slice|
      slice.sort_by { |r| r.answer }
    end
    all.reject! { |s| s.map(&:answer) != ["Approve", "Disapprove", "Undecided"] }
    return { responses: all.sort_by { |sl| sl[0].date } }
  end

  def responses_json_2016_gop
    candidates = self.responses.pluck(:answer).uniq.reject { |c| c == "Undecided" || c == "Refused" }
    return candidates.map { |choice| { answer: choice, responses: self.responses.where(answer: choice).order("date ASC") } }
  end

end
