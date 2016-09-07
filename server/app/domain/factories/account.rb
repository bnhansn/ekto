module Factories
  module Account
    module_function

    def build(user_id, params)
      attributes = sanitize(params)
      account = ::Account.new(attributes)
      account.owner_id = user_id
      account.key = generate_key
      account.slug = generate_slug(account)
      account
    end

    def assign(account, params)
      attributes = sanitize(params)
      account.assign_attributes(attributes)
      account.slug = generate_slug(account)
      account
    end

    def sanitize(params)
      params.permit(
        :description,
        :image,
        :name
      )
    end

    def generate_key
      loop do
        key = SecureRandom.hex.first(10)
        return key unless ::Account.exists?(key: key)
      end
    end

    def generate_slug(account)
      index = 1
      loop do
        slug = "#{account.name.parameterize}#{index == 1 ? '' : "-#{index}"}"
        return slug if slug_unique?(slug, account.id)
        index += 1
      end
    end

    def slug_unique?(slug, account_id)
      true unless ::Account.with_deleted.where(slug: slug)
                           .where.not(id: account_id).any?
    end
  end
end
