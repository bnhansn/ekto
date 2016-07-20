class Api::PostsController < Api::BaseController
  def index
    account = @user.accounts.find(params[:account_id])
    render json: account.posts
  end

  def create
    account = @user.accounts.find(params[:account_id])
    post = account.posts.build(create_params)
    if post.save
      render json: post, status: :created
    else
      render_errors(post)
    end
  end

  def update
    account = @user.accounts.find(params[:account_id])
    post = account.posts.find(params[:id])
    if post.update(update_params)
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

  private

  def safe_params
    params.permit(
      :account_id,
      :author_id,
      :featured,
      :html,
      :markdown,
      :title,
      :slug,
      :image,
      :published,
      :published_at,
      :published_by
    )
  end

  def create_params
    safe_params.merge(created_by: @user.id, updated_by: @user.id)
  end

  def update_params
    safe_params.merge(updated_by: @user.id)
  end
end
