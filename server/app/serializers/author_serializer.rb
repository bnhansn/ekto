class AuthorSerializer < ActiveModel::Serializer
  def json_key
    'data'
  end

  attributes :id,
             :email,
             :name
end
