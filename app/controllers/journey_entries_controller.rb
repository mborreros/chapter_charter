class JourneyEntriesController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    journey_entries = JourneyEntry.all.order(created_at: :asc)
    render json: journey_entries, status: :ok
  end

  def show
    this_journey_entry = JourneyEntry.find(params[:id])
    render json: this_journey_entry, status: :ok
  end

  def create
    if params[:progress] == 100
      journey = Journey.find(params[:journey_id])
      journey.update!(end_date: params[:date], completed: true)
    end

    new_journey_entry = JourneyEntry.create!(journey_entry_params)

    render json: new_journey_entry, status: :ok
  end

  def update
    journey_entry = JourneyEntry.find(params[:id])
    journey_entry.update!(journey_entry_params)
    render json: journey_entry, status: :ok
  end

  def destroy
    this_journey_entry = JourneyEntry.find(params[:id])
    this_journey_entry.destroy
    render json: this_journey_entry.journey, status: :ok
  end

  private

  def journey_entry_params
    params.permit(:journey_id, :date, :progress)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: "Journey Entry or Entries not found" }, status: :not_found
  end

end
