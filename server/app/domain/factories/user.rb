module Factories
  module User
    module_function

    def build(params)
      user = ::User.new(sanitize_params(params))
      user
    end

    def sanitize_params(params)
      params.permit(
        :email,
        :name,
        :password
      )
    end
  end
end
