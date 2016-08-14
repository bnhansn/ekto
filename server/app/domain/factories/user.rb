module Factories
  module User
    module_function

    def build(params)
      attributes = sanitize(params)
      user = ::User.new(attributes)
      user
    end

    def assign(user, params)
      attributes = sanitize(params)
      user.assign_attributes(attributes)
      user
    end

    def sanitize(params)
      params = params.permit(
        :email,
        :name,
        :password
      )
      params
    end
  end
end
