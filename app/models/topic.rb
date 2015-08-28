class Topic < ActiveRecord::Base
  has_many :questions
  has_many :responses, through: :questions
  has_many :polls, through: :responses

  validates_presence_of :name

  def responses_json
    topic_responses = []
    self.questions.each do |q|
      topic_responses << { question: q, responses: q.responses}
    end
    topic_responses
  end

end
