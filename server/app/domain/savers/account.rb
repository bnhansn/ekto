module Savers
  module Account
    module_function

    def create(user_id, params)
      account = Factories::Account.build(user_id, params)
      account.save
      return account if account.errors.any?
      AccountUser.create(user_id: user_id, account_id: account.id)
      account
    end

    def update(account, params)
      account = Factories::Account.assign(account, params)
      account.save
      account
    end
  end
end
