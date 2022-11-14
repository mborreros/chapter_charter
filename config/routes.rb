Rails.application.routes.draw do
  resources :birds
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")

  # test route to ensure rails is able to work with render services
  root "birds#index"
end
