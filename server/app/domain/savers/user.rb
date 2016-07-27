module Savers
  module User
    module_function

    def create(params)
      user = Factories::User.build(params)
      user.save
      user
    end

    def update(user, params)
      user = Factories::User.assign(user, params)
      user.save
      user
    end
  end
end
