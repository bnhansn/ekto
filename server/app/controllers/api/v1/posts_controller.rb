class Api::V1::PostsController < Api::V1::BaseController
  def index
    render json: @account.posts.published,
           each_serializer: PostV1Serializer,
           root: 'data' # AMS #1536
  end

  def show
    post = @account.posts.published.friendly.find(params[:id])
    render json: post, serializer: PostV1Serializer
  end
end
