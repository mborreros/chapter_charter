class JourneysController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    journeys = Journey.all
    render json: journeys, status: :ok
  end

  def show
    this_journey = Journey.find(params[:id])
    render json: this_journey, status: :ok
  end

  def create
    new_journey = Journey.create!(journey_params)
    render json: new_journey, status: :ok
  end

  def update
    journey = Journey.find(params[:id])
    journey.update!(journey_params)
    render json: journey, status: :ok
  end

  def destroy
    this_journey = Journey.find(params[:id])
      this_journey.destroy
      head :no_content
  end

  private

  def journey_params
    params.permit(:book_id, :user_id, :start_date, :end_date, :manually_completed)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: "Journey(s) not found" }, status: :not_found
  end

end
