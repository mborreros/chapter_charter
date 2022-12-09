Rails.application.routes.draw do
  
  # handles api routes
  scope "/api" do
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :books, only: [:index, :show, :create, :destroy]

    resources :collections, only: [:index, :show, :create, :update, :destroy]
    resources :collection_entries, only: [:index, :show, :create, :update, :destroy]

    resources :journeys, only: [:index, :show, :create, :update, :destroy]
    resources :journey_entries, only: [:index, :show, :create, :update, :destroy]

    resources :challenges, only: [:index, :show, :create, :update, :destroy]
    resources :challenge_entries, only: [:index, :show, :create, :update, :destroy]

    resources :users, only: [:show] do
      resources :journeys, only: [:index]
    end

    resources :users, only: [:show] do
      resources :collections, only: [:index]
    end

    resources :users, only: [:show] do
      resources :challenges, only: [:index]
    end

  end

  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"

  # handles react routes unrelated to the backend
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html } 
  
end


