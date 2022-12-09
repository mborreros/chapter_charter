class FallbackController < ActionController::Base
  def index
    # debugger
    render file: 'public/index.html'
  end
end