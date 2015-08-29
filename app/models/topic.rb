class Topic < ActiveRecord::Base
  has_many :charts
  has_many :responses, through: :charts

  validates_presence_of :name

  include ResponsesHelper

  def responses_json
    self.charts.select { |ch| ch.responses.length > 0 }.map { |c| { chart: c, responses: bucketize_responses(c.responses) } }
  end

end
