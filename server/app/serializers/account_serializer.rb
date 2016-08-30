class AccountSerializer < ActiveModel::Serializer
  def json_key
    'data'
  end

  attributes :id,
             :created_at,
             :description,
             :key,
             :meta_description,
             :meta_title,
             :name,
             :owner_id,
             :slug,
             :updated_at
end
