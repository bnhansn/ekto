Rails.application.routes.draw do
  namespace :api, path: '/' do
    namespace :v0 do
      post 'login', to: 'login#login'
      post 'signup', to: 'signups#signup'
      post 'authenticate', to: 'authentication#authenticate'
      post 'forgot', to: 'passwords#forgot'
      post 'reset', to: 'passwords#reset'
      resources :users, only: [:index, :update]
      resources :accounts, only: [:index, :create, :show, :update, :destroy] do
        member do
          get 'users'
        end
        resources :posts, only: [:index, :create, :show, :update, :destroy]
      end
      post 'accounts/:account_id/team/invite_new', to: 'team#invite_new'
      post 'accounts/:account_id/team/invite_existing',
           to: 'team#invite_existing'
      post 'accounts/:account_id/team/remove', to: 'team#remove'
    end
    namespace :v1 do
      resources :accounts, path: '/', only: [:show] do
        resources :posts, only: [:index, :show]
      end
    end
  end

  get '*not_found', to: 'application#routing_error'
end
