class SessionsController < ApplicationController

  skip_before_action :authorized, only: [:create]

  def create
    user = User.find_by(username: params[:username])
    session[:user_id] = user.id
    render json: user
  end

  def destroy
    user = User.find_by(id: session[:user_id])
    if user
      session.delete :user_id
      head :no_content
    else
      render json: {errors: ["User not found. You have not been logged out."]}, status: :unauthorized
    end
  end

end
