Rails.application.routes.draw do
  root 'pages#index'
  resources :topics, only: [:index, :show]
end
