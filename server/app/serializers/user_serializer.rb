class UserSerializer < ActiveModel::Serializer
  attributes :email, :first_name, :last_name, :name, :created_at, :updated_at
end
