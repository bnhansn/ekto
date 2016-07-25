class Api::V0::UsersController < Api::V0::BaseController
  skip_before_action :authenticate_user

  def create
    user = Savers::User.create(params)
    if user.persisted?
      render_user_and_token(user, :created)
    else
      render_errors(user)
    end
  end
end
