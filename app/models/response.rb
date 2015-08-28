class Response < ActiveRecord::Base
  belongs_to :chart
  has_one :topic, through: :chart

  validates_presence_of :chart_id, :answer, :percentage, :date
end
