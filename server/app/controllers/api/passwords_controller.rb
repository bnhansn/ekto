class Api::PasswordsController < Api::BaseController
  skip_before_action :authenticate_user

  def forgot
    user = User.find_by_email(params[:email])
    success = Services::PasswordReset.send_reset(user)

    if success
      render json: {}, status: :ok
    else
      render json: {
        errors: [{ title: 'Account was not found by this email' }]
      }, status: :not_found
    end
  end

  def reset
    user = User.find_by_password_reset_token(params[:token])
    user, error, status =
      Services::PasswordReset.update_password(user, params[:password])

    if user && !error
      render_user_and_token(user)
    else
      render json: {
        errors: [{ title: error }]
      }, status: status
    end
  end
end
