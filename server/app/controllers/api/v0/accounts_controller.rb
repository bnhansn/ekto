class Api::V0::AccountsController < Api::V0::BaseController
  def index
    render json: @user.accounts
  end

  def create
    account = Savers::Account.create(@user.id, params)
    if account.persisted?
      render json: account, status: :created
    else
      render_errors(account)
    end
  end

  def show
    account = @user.accounts.friendly.find(params[:id])
    render json: account
  end

  def update
    account = @user.accounts.friendly.find(params[:id])
    account = Savers::Account.update(account, params)

    if account.errors.empty?
      render json: account, status: :ok
    else
      render_errors(account)
    end
  end

  def destroy
    account = @user.accounts.friendly.find(params[:id])
    return unauthorized_error unless account.owner_id == @user.id
    account.destroy
    render json: account, status: :ok
  end

  def team
    account = @user.accounts.friendly.find(params[:id])
    render json: account.users
  end
end
