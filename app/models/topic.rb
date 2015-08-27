class Topic < ActiveRecord::Base
  has_many :questions
  has_many :responses, through: :questions
  has_many :polls, through: :responses

  validates_presence_of :name
end
