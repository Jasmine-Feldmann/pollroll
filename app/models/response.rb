class Response < ActiveRecord::Base
  belongs_to :poll
  belongs_to :question
  has_one :topic, through: :question

  validates_presence_of :poll_id, :question_id, :percentage, :answer
end
