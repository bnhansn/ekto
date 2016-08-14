class DomainSerializer < ActiveModel::Serializer
  def json_key
    'data'
  end

  attributes :id,
             :account_id,
             :created_at,
             :updated_at,
             :url
end
