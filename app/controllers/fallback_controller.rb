class FallbackController < ActiveController::Base
  def index
    render file: 'public/index.html'
  end
end