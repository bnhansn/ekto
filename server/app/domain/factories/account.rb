module Factories
  module Account
    module_function

    def build(user_id, params)
      account = ::Account.new(params.permit(:name))
      account.created_by = user_id
      account
    end
  end
end
