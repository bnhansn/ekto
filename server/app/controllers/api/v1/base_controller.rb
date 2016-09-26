class Api::V1::BaseController < ApplicationController
  before_action :authenticate_request

  private

  def authenticate_request
    key = params[:account_id] || params[:id]
    @account = Account.find_by_key(key)
    return account_not_found(key) unless @account
  end

  def account_not_found(key)
    render json: {
      errors: [{ message: "Account not found by api key #{key}" }]
    }, status: :not_found
  end
end
