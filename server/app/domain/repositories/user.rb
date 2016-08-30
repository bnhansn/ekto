module Repositories
  module User
    module_function

    def search(query)
      if query.present?
        ::User.where('name || email ilike ?', "%#{query}%")
              .order(:name)
              .limit(8)
      else
        []
      end
    end
  end
end
