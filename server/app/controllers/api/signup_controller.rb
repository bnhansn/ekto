class Api::SignupController < Api::BaseController
  skip_before_action :authenticate_user

  def signup
    user = User.new(signup_params)
    if user.save
      render_user_and_token(user, :created)
    else
      render_errors(user)
    end
  end

  private

  def signup_params
    params.permit(:first_name, :last_name, :email, :password)
  end
end
