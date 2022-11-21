class ChallengesController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index 
    challenges = Challenge.all
    render json: challenges, status: :ok
  end

  def show
    this_challenge = Challenge.find(params[:id])
    render json: this_challenge, status: :ok
  end

  def create
    new_challenge = Challenge.create!(challenge_params)
    render json: new_challenge, status: :created
  end

  def update
    this_challenge = Challenge.find(params[:id])
    this_challenge.update(challenge_params)
    render json: this_challenge, status: :ok

  end

  def destroy
    this_challenge = Challenge.find(params[:id])
      this_challenge.destroy
      head :no_content
  end

  private 

  def challenge_params
    params.permit(:name, :description, :start_date, :end_date, :user_id, :goal_number, :goal_type, :category, :category_identifier, :active, :successful)
  end

  def render_not_found_response
    render json: { errors: "Challenge(s) not found" }, status: :not_found
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

end
