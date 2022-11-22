Rails.application.routes.draw do
  
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :books, only: [:index, :show, :create, :destroy]

  resources :collections, only: [:index, :show, :create, :update, :destroy]
  resources :collection_entries, only: [:index, :show, :create, :update, :destroy]

  resources :journeys, only: [:index, :show, :create, :update, :destroy]
  resources :journey_entries, only: [:index, :show, :create, :update, :destroy]

  resources :challenges, only: [:index, :show, :create, :update, :destroy]
  resources :challenge_entries, only: [:index, :show, :create, :update, :destroy]
  
end
