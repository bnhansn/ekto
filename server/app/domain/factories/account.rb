module Factories
  module Account
    module_function

    def build(user_id, params)
      attributes = sanitize(params)
      account = ::Account.new(attributes)
      account.created_by = user_id
      account
    end

    def assign(account, params)
      attributes = sanitize(params)
      account.assign_attributes(attributes)
      account
    end

    def sanitize(params)
      params = params.require(:data).permit(
        attributes: [:name]
      )
      params[:attributes] || {}
    end
  end
end
