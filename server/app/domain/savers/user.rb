module Savers
  module User
    module_function

    def create(params)
      user = Factories::User.build(params)
      user.save
      user
    end
  end
end
