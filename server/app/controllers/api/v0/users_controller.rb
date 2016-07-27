class Api::V0::UsersController < Api::V0::BaseController
  skip_before_action :authenticate_user, only: :create

  def create
    user = Savers::User.create(params)
    if user.persisted?
      render_user_and_token(user, :created)
    else
      render_errors(user)
    end
  end

  def update
    user = User.find(params[:id])
    return unauthorized_error unless user == @user

    user = Savers::User.update(user, params)
    if user.errors.empty?
      render json: user, status: :ok
    else
      render_errors(user)
    end
  end
end
