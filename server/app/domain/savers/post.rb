module Savers
  module Post
    module_function

    def create(user_id, account_id, params)
      post = Factories::Post.build(user_id, account_id, params)
      post.save
      post
    end

    def update(post, user_id, params)
      post = Factories::Post.assign(post, user_id, params)
      post.save
      post
    end
  end
end
