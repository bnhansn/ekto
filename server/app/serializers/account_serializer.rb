class AccountSerializer < ActiveModel::Serializer
  def json_key
    'data'
  end

  attributes :id,
             :created_at,
             :key,
             :name,
             :owner_id,
             :slug,
             :updated_at
end
