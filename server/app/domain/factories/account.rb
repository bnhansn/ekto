module Factories
  module Account
    module_function

    def build(user_id, params)
      attributes = sanitize(params)
      account = ::Account.new(attributes)
      account.owner_id = user_id
      account.slug_id = slug_id(account)
      account
    end

    def assign(account, params)
      attributes = sanitize(params)
      account.assign_attributes(attributes)
      account.slug_id = slug_id(account)
      account
    end

    def sanitize(params)
      params = params.permit(:name)
      params
    end

    def slug_id(account)
      ::Account.with_deleted.where('lower(name) = ?', account.name.downcase).count + 1 # rubocop:disable LineLength
    end
  end
end
