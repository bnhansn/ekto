class UserSerializer < ActiveModel::Serializer
  def json_key
    'data'
  end

  attributes :id,
             :created_at,
             :email,
             :name,
             :updated_at
end
