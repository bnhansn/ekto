class PostSerializer < ActiveModel::Serializer
  attributes :account_id,
             :author_id,
             :created_at,
             :created_by,
             :featured,
             :html,
             :markdown,
             :title,
             :slug,
             :image,
             :published,
             :published_at,
             :published_by,
             :updated_at,
             :updated_by
end
