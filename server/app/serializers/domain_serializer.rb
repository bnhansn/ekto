class DomainSerializer < ActiveModel::Serializer
  attributes :account_id, :url, :created_at, :updated_at
end
