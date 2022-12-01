Rails.application.routes.draw do
  
  namespace :api do
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :books, only: [:index, :show, :create, :destroy]

    resources :collections, only: [:index, :show, :create, :update, :destroy]
    resources :collection_entries, only: [:index, :show, :create, :update, :destroy]

    resources :journeys, only: [:index, :show, :create, :update, :destroy]
    resources :journey_entries, only: [:index, :show, :create, :update, :destroy]

    resources :challenges, only: [:index, :show, :create, :update, :destroy]
    resources :challenge_entries, only: [:index, :show, :create, :update, :destroy]
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html } 
  
end
