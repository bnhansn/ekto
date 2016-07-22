class UserSerializer < ActiveModel::Serializer
  attributes :created_at,
             :email,
             :name,
             :updated_at
end
