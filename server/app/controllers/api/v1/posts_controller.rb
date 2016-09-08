class Api::V1::PostsController < Api::V1::BaseController
  def index
    posts = Repositories::Post.external_query(@account, params)
    render json: posts,
           meta: pagination(posts),
           root: 'data',
           each_serializer: PostV1Serializer
  end

  def show
    post = @account.posts.published.friendly.find(params[:id])
    render json: post, serializer: PostV1Serializer
  end
end
