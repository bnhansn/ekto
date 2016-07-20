class Api::AccountsController < Api::BaseController
  def index
    render json: @user.accounts
  end

  def create
    account = Account.new(create_params)
    if account.save
      AccountUser.create(user: @user, account: account)
      render json: account, status: :created
    else
      render_errors(account)
    end
  end

  def show
    account = @user.accounts.find(params[:id])
    render json: account
  end

  def update
    account = @user.accounts.find(params[:id])
    if account.update(account_params)
      render json: account, status: :ok
    else
      render_errors(account)
    end
  end

  private

  def account_params
    params.permit(:name)
  end

  def create_params
    account_params.merge(created_by: @user.id)
  end
end
