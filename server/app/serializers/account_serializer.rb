class AccountSerializer < ActiveModel::Serializer
  attributes :created_at,
             :created_by,
             :name,
             :updated_at
end
