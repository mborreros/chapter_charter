# test content to ensure rails is able to work with render services

class BirdsController < ApplicationController

  # GET /birds
  def index
    birds = Bird.all
    render json: birds
  end

  # SHOW /birds/:id
  def show
    bird = Bird.find(params[:id])
    render json: bird
  rescue ActiveRecord::RecordNotFound
    render json: "Bird not found", status: :not_found
  end

end
