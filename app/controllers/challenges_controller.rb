class ChallengesController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index 
    if params[:user_id]
      this_user = User.find(params[:user_id])
      challenges = this_user.challenges.order(created_at: :desc)
    else 
      challenges = Challenge.all
    end
    render json: challenges, status: :ok
  end

  def show
    this_challenge = Challenge.find(params[:id])
    render json: this_challenge, status: :ok
  end

  def create
    check_if_challenge_for_collection(params)
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
    if this_challenge.category === "collection_id"
      update_collection_after_challenge_delete(this_challenge.category_identifier) 
    end
      this_challenge.destroy 
      render json: { message: "Successful deletion of challenge" }, status: :ok
  end

  private 

  def check_if_challenge_for_collection(params)
    if params[:category] === "collection_id"
      selected_collection = Collection.find_by(id: params[:category_identifier])
      if params[:action] === "create"
        selected_collection.update!(challenge_locked: true)
      end
    end
  end

  def update_collection_after_challenge_delete(collection_id) 
    collection = Collection.find(collection_id)
    collection.update(challenge_locked: false)
  end

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
