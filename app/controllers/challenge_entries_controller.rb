class ChallengeEntriesController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    challenge_entries = ChallengeEntry.all
    render json: challenge_entries, status: :ok
  end

  def show
    this_challenge_entry = ChallengeEntry.find(params[:id])
    render json: this_challenge_entry, status: :ok
  end

  def create
    new_challenge_entry = ChallengeEntry.create!(challenge_entry_params)
    render json: new_challenge_entry, status: :created
  end

  def update
    this_challenge_entry = ChallengeEntry.find(params[:id])
    this_challenge_entry.update(challenge_entry_params)
    render json: this_challenge_entry, status: :ok
  end

  def destroy
    this_challenge_entry = ChallengeEntry.find(params[:id])
    this_challenge_entry.destroy
    head :no_content
  end

  private

  def challenge_entry_params
    params.permit(:book_id, :challenge_id, :journey_entry_id)
  end

  def render_not_found_response
    render json: { errors: "Challenge(s) not found" }, status: :not_found
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

end
