class Api::V0::AuthenticationController < Api::V0::BaseController
  skip_before_action :authenticate_user

  def authenticate
    decoded_token = JsonWebToken.decode(params[:token])
    user = User.find(decoded_token[:user_id]) if decoded_token
    if user
      render_user_and_token(user)
    else
      render json: {
        errors: [{ title: 'Unauthorized' }]
      }, status: :unauthorized
    end
  end
end
