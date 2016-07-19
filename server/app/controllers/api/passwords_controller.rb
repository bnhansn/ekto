class Api::PasswordsController < Api::BaseController
  skip_before_action :authenticate_user

  def forgot
    user = User.find_by_email(params[:email])
    user.send_password_reset if user
    render json: {}, status: :ok
  end

  def reset
    user = User.find_by_password_reset_token(params[:token])
    reset_allowed = user && user.password_reset_sent_at > 6.hours.ago
    if reset_allowed
      update_password(user, params[:password])
    else
      render json: {
        errors: [{ title: 'Password reset token has expired' }]
      }, status: :forbidden
    end
  end

  private

  def update_password(user, password)
    if user.reset_password(password)
      render_user_and_token(user)
    else
      render_errors(user)
    end
  end
end
