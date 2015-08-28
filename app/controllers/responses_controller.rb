class ResponsesController < ApplicationController

  def index
    @responses = Response.all
  end

  def show
    @response = Response.find(params[:id])
    render json: @response
  end

end
