module Factories
  module User
    module_function

    def build(params)
      attributes = sanitize(params)
      user = ::User.new(attributes)
      user
    end

    def sanitize(params)
      params = params.require(:data).permit(
        attributes: [
          :email,
          :name,
          :password
        ]
      )
      params[:attributes] || {}
    end
  end
end
