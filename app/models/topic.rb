class Topic < ActiveRecord::Base
  has_many :polls

  validates_presence_of :name
end
