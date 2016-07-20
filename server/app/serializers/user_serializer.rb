class UserSerializer < ActiveModel::Serializer
  attributes :created_at,
             :email,
             :first_name,
             :last_name,
             :name,
             :updated_at
end
