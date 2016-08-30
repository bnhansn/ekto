class Api::V1::BaseController < ApplicationController
  before_action :authenticate_request

  private

  def authenticate_request
    account_id = params[:account_id] || params[:id]
    @account = Account.find_by_key(account_id)
    return account_not_found(account_id) unless @account
    origin = request.headers['HTTP_ORIGIN']
    return domain_unauthorized unless @account.whitelist_hosts.include?(origin)
  end

  def account_not_found(account_id)
    render json: {
      errors: [{ message: "Account not found by id #{account_id}" }]
    }, status: :not_found
  end

  def domain_unauthorized
    render json: {
      errors: [{
        message: "Domain #{request.headers['HTTP_ORIGIN']} not whitelisted "\
                 "for account #{@account.key}"
      }]
    }, status: :unauthorized
  end
end
