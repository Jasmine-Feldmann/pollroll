require 'rails_helper'

RSpec.describe Chart, :type => :model do

  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:topic_id) }
    it { should validate_presence_of(:state) }
    it { should validate_presence_of(:slug) }
  end

end
