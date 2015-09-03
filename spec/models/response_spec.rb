require 'rails_helper'

RSpec.describe Response, :type => :model do

  describe "validations" do
    it { should validate_presence_of(:chart_id) }
    it { should validate_presence_of(:answer) }
    it { should validate_presence_of(:percentage) }
    it { should validate_presence_of(:date) }
  end

end
