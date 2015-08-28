class Topic < ActiveRecord::Base
  has_many :charts
  has_many :responses, through: :charts

  validates_presence_of :name

  def responses_json
    self.questions.map {|q| { question: q, responses: q.responses} }
  end

end
