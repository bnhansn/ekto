class Api::V0::UsersController < Api::V0::BaseController
  def index
    users = Repositories::User.search(params[:search])
    render json: users, root: 'data'
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
