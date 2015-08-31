class TopicsController < ApplicationController

  def index
    @topics = Topic.all
    render json: @topics
  end

  def show
    @topic = Topic.find(params[:id])
    render json: @topic.responses_json_obama_approval if @topic.id ==  1
    render json: @topic.responses_json if @topic.id > 1
  end

end
