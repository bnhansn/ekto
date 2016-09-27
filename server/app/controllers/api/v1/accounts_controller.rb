class Api::V1::AccountsController < Api::V1::BaseController
  def show
    render json: @account, serializer: AccountV1Serializer
  end
end
