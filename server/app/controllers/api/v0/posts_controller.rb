class Api::V0::PostsController < Api::V0::BaseController
  def index
    account = @user.accounts.find(params[:account_id])
    render json: account.posts
  end

  def create
    account = @user.accounts.find(params[:account_id])
    post = Savers::Post.create(@user.id, account.id, params)
    if post.persisted?
      render json: post, status: :created
    else
      render_errors(post)
    end
  end

  def update
    account = @user.accounts.find(params[:account_id])
    post = account.posts.find(params[:id])
    post = Savers::Post.update(post, @user.id, account.id, params)
    if post.errors.empty?
      render json: post, status: :ok
    else
      render_errors(post)
    end
  end

  def destroy
    account = @user.accounts.find(params[:account_id])
    post = account.posts.find(params[:id])
    post.destroy
    render json: post, status: :ok
  end
end
