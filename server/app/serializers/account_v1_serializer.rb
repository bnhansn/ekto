class AccountV1Serializer < ActiveModel::Serializer
  def json_key
    'data'
  end

  attributes :id,
             :created_at,
             :description,
             :image,
             :meta_title,
             :meta_description,
             :name,
             :owner_id,
             :slug,
             :updated_at
end
