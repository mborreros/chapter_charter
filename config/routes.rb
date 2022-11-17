Rails.application.routes.draw do
  
  
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :books, only: [:index, :show, :create, :destroy]

  resources :collections, only: [:index, :show, :create, :update, :destroy]
  resources :collection_entries, only: [:index, :show, :create, :update, :destroy]

  resources :journeys, only: [:index, :show, :create, :update, :destroy]
  resources :journey_entries, only: [:index, :show, :update, :destroy]

  # nested route to update journey to completed: true and add end_date based on 100% journey entry
  resources :journey_entries, only: [:create] do
    # url to access this nested route /journey_entries/:journey_entry_id/journeys/:id
    resources :journeys, only: [:update]
  end
  
end
