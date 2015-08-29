class Topic < ActiveRecord::Base
  has_many :charts
  has_many :responses, through: :charts

  validates_presence_of :name

  include ResponsesHelper

  # def responses_json
  #   self.charts.map { |c| { chart: c, responses: bucketize_responses(c.responses) } }
  # end

  def responses_json
    keyed_json = {}
    self.charts.each do |c|
      sorted_responses = c.responses.order("date ASC").limit(3).sort_by { |r| r.percentage.to_f }
      keyed_json[c.state] = { responses: sorted_responses,
                              fillKey: sorted_responses.last.answer }
    end
    return keyed_json
  end

end
