class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorized

  private

  def authorized
    unless session.include? :user_id
      render json: {error: "User not authorized, please login to view content"}, status: :unauthorized
    end
  end

end
