class Topic < ActiveRecord::Base
  has_many :charts
  has_many :responses, through: :charts

  validates_presence_of :name

  include ResponsesHelper

  def responses_json
    self.charts_with_responses.map { |c| { chart: c, responses: bucketize_responses(c.filter_incomplete_polls) } }
  end

  def charts_with_responses
    self.charts.select { |ch| ch.responses.length > 0 }
  end

end
