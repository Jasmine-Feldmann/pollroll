class PollsController < ApplicationController

  def index
    @polls = Poll.all
    render json: @ polls
  end

  def show
    @poll = Poll.find(params[:id])
    render json: @poll
  end

end
