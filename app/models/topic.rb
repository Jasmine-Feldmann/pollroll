class Topic < ActiveRecord::Base
  has_many :questions
  has_many :responses, through: :questions
  has_many :polls, through: :responses

  validates_presence_of :name

  def responses_json
    topic_responses = []
    self.questions.each { |q| topic_responses << { q => q.responses} }
    topic_responses
  end

end
