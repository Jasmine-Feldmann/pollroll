class Question < ActiveRecord::Base
  belongs_to :topic
  has_many :responses
  has_many :polls, through: :responses

  validates_presence_of :state, :content, :created_at, :updated_at
end
