Rails.application.routes.draw do

  root 'pages#index'
  resources :topics, only: [:index, :show]
  resources :charts, only: [:index, :show]
  resources :responses, only: [:index, :show]

end
