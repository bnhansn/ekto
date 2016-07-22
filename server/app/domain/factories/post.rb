module Factories
  module Post
    module_function

    def build(user_id, account_id, params)
      post = ::Post.new(sanitize_params(params))
      post = assign_defaults(post)
      post.account_id = account_id
      post.created_by = user_id
      post.updated_by = user_id
      post
    end

    def assign(post, user_id, params)
      post.assign_attributes(sanitize_params(params))
      post = assign_defaults(post)
      post.updated_by = user_id
      post
    end

    def sanitize_params(params)
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
        :slug_candidate
      )
    end

    def assign_defaults(post)
      post.title = 'Untitled' unless post.title.present?
      post.slug_candidate = 'untitled' unless post.slug_candidate.present?
      post.slug_id = ::Post.count + 1
      post
    end
  end
end
