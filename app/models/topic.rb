class Topic < ActiveRecord::Base
  has_many :questions
  has_many :responses, through: :questions
  has_many :polls, through: :responses

  validates_presence_of :name

  def responses_json
    self.questions.map {|q| { question: q, responses: q.responses} }
  end

end
