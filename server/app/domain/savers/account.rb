module Savers
  module Account
    module_function

    def create(user_id, params)
      account = Factories::Account.build(user_id, params)

      ActiveRecord::Base.transaction do
        account.save
        AccountUser.create(user_id: user_id, account_id: account.id)
      end
      account
    end

    def update(account, params)
      account.update(params.permit(:name))
      account
    end
  end
end
