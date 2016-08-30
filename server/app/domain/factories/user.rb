module Factories
  module User
    module_function

    def build_for_signup(params)
      attributes = sanitize(params)
      user = ::User.new(attributes)
      user
    end

    def update_invited_user(user, params)
      attributes = sanitize(params)
      user.assign_attributes(attributes)
      user.is_pending = false
      user
    end

    def assign(user, params)
      attributes = sanitize(params)
      user.assign_attributes(attributes)
      user
    end

    def build_from_invitation(params)
      attributes = invitation_attributes(params)
      user = ::User.new(attributes)
      user.password = SecureRandom.hex(6)
      user.is_pending = true
      user
    end

    def sanitize(params)
      params.permit(
        :email,
        :name,
        :password
      )
    end

    def invitation_attributes(params)
      params.permit(
        :email,
        :name
      )
    end
  end
end
