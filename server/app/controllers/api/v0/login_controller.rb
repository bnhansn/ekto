class Api::V0::LoginController < Api::V0::BaseController
  skip_before_action :authenticate_user

  def login
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      render_user_and_token(user)
    else
      render json: {
        errors: [{ title: 'Invalid email or password' }]
      }, status: :unauthorized
    end
  end
end
