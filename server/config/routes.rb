Rails.application.routes.draw do
  namespace :api do
    post 'login', to: 'login#login'
    post 'signup', to: 'signup#signup'
    post 'authenticate', to: 'authentication#authenticate'
    post 'forgot', to: 'passwords#forgot'
    post 'reset', to: 'passwords#reset'
  end
end
