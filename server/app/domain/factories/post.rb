module Factories
  module Post
    module_function

    def build(user_id, account_id, params)
      attributes = sanitize(params)
      post = ::Post.new(attributes)
      post = defaults(post, account_id)
      post.account_id = account_id
      post.created_by = user_id
      post.updated_by = user_id
      post
    end

    def assign(post, user_id, account_id, params)
      attributes = sanitize(params)
      post.assign_attributes(attributes)
      post = defaults(post, account_id)
      post.updated_by = user_id
      post
    end

    def sanitize(params)
      params.require(:data).permit(
        attributes: [
          :author_id,
          :featured,
          :html,
          :markdown,
          :title,
          :image,
          :published,
          :published_at,
          :published_by,
          :slug_candidate
        ]
      )
    end

    def defaults(post, account_id)
      post.title = 'Untitled' unless post.title.present?
      post.slug_candidate = 'untitled' unless post.slug_candidate.present?
      post.slug_id = ::Post.where(account_id: account_id).count + 1
      post
    end
  end
end
