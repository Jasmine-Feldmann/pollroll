class TopicsController < ApplicationController

  def index
    @topics = Topic.all
    render json: @topics
  end

  def show
    @topic = Topic.find(params[:id])
    case @topic.id
    when 1
      render json: @topic.responses_json_obama_approval
    when 2
      render json: @topic.responses_2016_gop
    end
  end

end
