module Repositories
  module Post
    module_function

    def internal_query(account, params)
      account.posts
             .page(params[:page] || 1)
             .per(params[:limit] || 20)
             .order(published_at: :desc)
    end

    def external_query(account, params)
      posts = account.posts.published
      posts = search(posts, params[:search])
      posts.page(params[:page] || 1)
           .per(params[:limit] || 10)
           .order(published_at: :desc)
    end

    def search(posts, query)
      if query.present?
        posts.where('title || markdown ilike ?', "%#{query}%")
      else
        posts
      end
    end
  end
end
