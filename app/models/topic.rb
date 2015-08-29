class Topic < ActiveRecord::Base
  has_many :charts
  has_many :responses, through: :charts

  validates_presence_of :name

  include ResponsesHelper

  def responses_json
    self.charts.map { |c| { chart: c, responses: bucketize_responses(c.responses) } }
  end

end
