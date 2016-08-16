module Factories
  module Post
    module_function

    def build(user_id, account_id, params)
      attributes = sanitize(params)
      post = ::Post.new(attributes)
      post.account_id = account_id
      post.created_by = user_id
      post.updated_by = user_id
      post = defaults(post, account_id)
      post
    end

    def assign(post, user_id, account_id, params)
      attributes = sanitize(params)
      post.assign_attributes(attributes)
      post.updated_by = user_id
      post = defaults(post, account_id)
      post
    end

    def sanitize(params)
      params.permit(
        :author_id,
        :featured,
        :html,
        :markdown,
        :title,
        :image,
        :published,
        :published_at,
        :published_by,
        :slug
      )
    end

    def defaults(post, account_id)
      post.title = 'Untitled' unless post.title.present?
      post.slug = post.title unless post.slug.present?
      post.slug = post.slug.parameterize
      post.slug = verify_unique_slug(post, account_id)
      post
    end

    def verify_unique_slug(post, account_id)
      index = 1
      loop do
        slug = "#{post.slug}#{index == 1 ? '' : "-#{index}"}"
        return slug if slug_unique?(slug, post.id, account_id)
        index += 1
      end
    end

    def slug_unique?(slug, post_id, account_id)
      true unless ::Post.where(account_id: account_id, slug: slug)
                        .where.not(id: post_id).any?
    end
  end
end
