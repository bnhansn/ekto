class AccountSerializer < ActiveModel::Serializer
  attributes :created_at,
             :name,
             :owner_id,
             :slug,
             :updated_at
end
