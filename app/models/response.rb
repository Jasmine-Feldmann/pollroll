class Response < ActiveRecord::Base
  belongs_to :poll
  belongs_to :question

  validates_presence_of :poll_id, :question_id, :percentage, :answer, :created_at, :updated_at
end
