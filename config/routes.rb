Rails.application.routes.draw do
  resources :collection_entries
  
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :books, only: [:index, :show, :create, :destroy]

  resources :collections, only: [:index, :show, :create, :update, :destroy]

end
