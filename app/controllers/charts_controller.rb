class ChartsController < ApplicationController

  def index
    @charts = Chart.all
    render json: @charts
  end

  def show
    @chart = Chart.find(params[:id])
    render json: @chart
  end

end
