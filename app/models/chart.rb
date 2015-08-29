class Chart < ActiveRecord::Base
  belongs_to :topic
  has_many :responses

  validates_presence_of :topic_id, :name, :state, :slug

  def filter_incomplete_polls
    self.responses.order("date ASC").group_by(&:date).select { |dte, grp| grp.length == 3 }.map { |grp| grp[1] }.flatten
  end

end
