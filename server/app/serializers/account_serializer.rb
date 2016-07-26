class AccountSerializer < ActiveModel::Serializer
  attributes :created_at,
             :created_by,
             :name,
             :slug,
             :updated_at
end
