class Api::V0::DomainsController < Api::V0::BaseController
  def index
    account = @user.accounts.find(params[:account_id])
    render json: account.domains, root: 'data' # AMS #1536
  end

  def create
    account = @user.accounts.find(params[:account_id])
    domain = account.domains.new(domain_params)
    if domain.save
      render json: domain, status: :created
    else
      render_errors(domain)
    end
  end

  def destroy
    account = @user.accounts.find(params[:account_id])
    domain = account.domains.find(params[:id])
    domain.destroy
    render json: domain, status: :ok
  end

  private

  def domain_params
    params.permit(:host)
  end
end
