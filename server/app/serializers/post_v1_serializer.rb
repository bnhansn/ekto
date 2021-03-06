class PostV1Serializer < ActiveModel::Serializer
  def json_key
    'data'
  end

  has_one :author, serializer: AuthorSerializer

  attributes :id,
             :created_at,
             :featured,
             :html,
             :markdown,
             :meta_description,
             :meta_title,
             :title,
             :slug,
             :image,
             :published_at,
             :updated_at
end
