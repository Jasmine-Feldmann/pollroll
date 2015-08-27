class Poll < ActiveRecord::Base
  has_many :responses
  has_many :questions, through: :responses


  validates_presence_of :pollster, :start_date, :end_date, :topic_id, :created_at, :updated_at
end
