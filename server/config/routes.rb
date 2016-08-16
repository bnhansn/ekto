Rails.application.routes.draw do
  namespace :api, path: '/' do
    namespace :v0 do
      post 'login', to: 'login#login'
      post 'authenticate', to: 'authentication#authenticate'
      post 'forgot', to: 'passwords#forgot'
      post 'reset', to: 'passwords#reset'
      resources :users, only: [:create, :update]
      resources :accounts, only: [:index, :create, :show, :update, :destroy] do
        member do
          get 'team'
        end
        resources :posts, only: [:index, :create, :show, :update, :destroy]
        resources :domains, only: [:index, :create, :update, :destroy]
      end
    end
    namespace :v1 do
      resources :accounts, path: '/', only: [] do
        resources :posts, only: [:index, :show]
      end
    end
  end
end
