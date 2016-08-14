class Api::V1::PostsController < Api::V1::BaseController
  before_action :authenticate_request

  def index
    render json: @account.posts, root: 'data' # AMS #1536
  end

  def show
    post = @account.posts.friendly.find(params[:id])
    render json: post
  end

  private

  def authenticate_request
    @account = Account.find_by_key(params[:account_id])
    return account_not_found unless @account
    return domain_unauthorized unless @account.whitelist_hosts.include?(request.host) # rubocop:disable LineLength
  end

  def account_not_found
    render json: {
      errors: [{ message: "Account not found by id #{params[:account_id]}" }]
    }, status: :not_found
  end

  def domain_unauthorized
    render json: {
      errors: [{ message: 'Domain not whitelisted for account' }]
    }, status: :unauthorized
  end
end