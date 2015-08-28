class PollsController < ApplicationController

  def index
    @polls = Poll.all
  end

  def show
    @poll = Poll.find(params[:id])
    render json: @poll
  end

end
