Rails.application.routes.draw do
  namespace :api, path: '/' do
    namespace :v0 do
      post 'login', to: 'login#login'
      post 'signup', to: 'signup#signup'
      post 'authenticate', to: 'authentication#authenticate'
      post 'forgot', to: 'passwords#forgot'
      post 'reset', to: 'passwords#reset'
      resources :accounts, only: [:index, :create, :show, :update] do
        resources :posts, only: [:index, :create, :update, :destroy]
      end
    end
    namespace :v1 do
      resources :accounts, only: [] do
        resources :posts, only: [:index]
      end
    end
  end
end
