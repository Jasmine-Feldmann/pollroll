class Chart < ActiveRecord::Base
  belongs_to :topic
  has_many :responses

  validates_presence_of :topic_id, :name, :state, :slug
end
