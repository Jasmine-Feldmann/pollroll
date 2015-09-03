require 'rails_helper'

RSpec.describe TopicsController, :type => :controller do

  let!(:topic) { Topic.create!(name: "Test") }

  describe 'GET #index' do
    it "should assign @topics" do
      get :index
      expect(assigns(:topics)).to eq Topic.all
    end

    it "renders all topics in JSON" do
      get :index
      expect(response.body).to eq Topic.all.to_json
    end
  end




end
