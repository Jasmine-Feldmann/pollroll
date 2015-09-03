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

  describe 'GET #show' do
    it "should assign @topic" do
      get :show, { id: topic.to_param }
      expect(assigns(:topic)).to eq topic
    end

    it "renders the topic's responses in JSON" do
      get :show, { id: topic.to_param }
      expect(response.body).to eq [].to_json
    end
  end

end
