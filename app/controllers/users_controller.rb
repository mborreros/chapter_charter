class UsersController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  skip_before_action :authorized, only: [:create]

  def index
    users = User.all
    render json: users, status: :ok
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, status: :ok
    else
      render json: { error: "User is not authorized" }, status: :unauthorized 
    end
  end

  def create
    new_user = User.create!(user_params)
    render json: new_user, status: :created
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user, status: :ok
  end

  def destroy
    user = User.find(params[:id])
      user.destroy
      head :no_content
  end
  

  private

  def user_params
    params.permit(:username, :password, :screenname, :avatar_img)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: "User(s) not found" }, status: :not_found
  end

end
