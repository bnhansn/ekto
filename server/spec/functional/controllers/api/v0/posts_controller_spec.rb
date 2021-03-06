require_relative '../../../../rails_helper'

RSpec.describe Api::V0::PostsController, type: :controller do
  describe 'GET #index' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'returns all of the account\'s posts' do
        outside_account = create(:account)
        expect do
          @post_1 = create(:post, account_id: @account.id)
          @post_2 = create(:post, account_id: @account.id)
          create(:post, account_id: outside_account.id)
        end.to change { Post.count }.from(0).to(3)

        process :index, params: { account_id: @account.id }

        result = JSON.parse(response.body)
        ids = result['data'].map { |x| x['id'] }

        expect(response).to have_http_status(:ok)
        expect(result['data'].count).to eq(2)
        expect(ids).to include(@post_1.id, @post_2.id)
      end

      it 'orders posts by published date' do
        newest_post = create(:post, account_id: @account.id, published_at: 1.day.ago) # rubocop:disable LineLength
        oldest_post = create(:post, account_id: @account.id, published_at: 3.days.ago) # rubocop:disable LineLength
        _post = create(:post, account_id: @account.id, published_at: 2.days.ago)

        process :index, params: { account_id: @account.id }

        result = JSON.parse(response.body)

        expect(result['data'][0]['id']).to eq(newest_post.id)
        expect(result['data'][2]['id']).to eq(oldest_post.id)
      end

      it 'includes pagination' do
        _post = create(:post, account_id: @account.id)
        _post = create(:post, account_id: @account.id)
        _post = create(:post, account_id: @account.id)

        process :index, params: { account_id: @account.id }

        result = JSON.parse(response.body)

        expect(result['meta']).to have_key('currentPage')
        expect(result['meta']).to have_key('nextPage')
        expect(result['meta']).to have_key('prevPage')
        expect(result['meta']).to have_key('totalPages')
        expect(result['meta']).to have_key('totalCount')
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)

        process :index, params: { account_id: account.id }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to have_error("Couldn't find account")
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)

        process :index, params: { account_id: account.id }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST #create' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'creates a new post' do
        process :create,
                method: :post,
                params: {
                  account_id: @account.id,
                  title: 'New post title'
                }

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:created)
        expect(result['data']['id']).not_to be(nil)
        expect(result['data']['title']).to eq('New post title')
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)

        process :create,
                method: :post,
                params: {
                  account_id: account.id,
                  title: 'New post title'
                }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to have_error("Couldn't find account")
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)

        process :create,
                method: :post,
                params: {
                  account_id: account.id,
                  title: 'New post title'
                }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET #show' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'renders a post' do
        post = create(:post, account_id: @account.id)

        process :show, params: { id: post.id, account_id: @account.id }

        result = JSON.parse(response.body)

        expect(result['data']['title']).to eq(post.title)
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)
        post = create(:post, account_id: account.id)

        process :show, params: { id: post.id, account_id: account.id }

        expect(response).to have_http_status(:not_found)
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)
        post = create(:post, account_id: account.id)

        process :show, params: { id: post.id, account_id: account.id }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST #update' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'updates a post' do
        post = create(:post, title: 'Original title', account_id: @account.id)

        process :update,
                method: :post,
                params: {
                  id: post.id,
                  account_id: @account.id,
                  title: 'Updated title'
                }

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:ok)
        expect(result['data']['id']).to eq(post.id)
        expect(result['data']['title']).to eq('Updated title')
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)
        post = create(:post, title: 'Original title', account_id: account.id)

        process :update,
                method: :post,
                params: {
                  id: post.id,
                  account_id: account.id,
                  title: 'Updated title'
                }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to have_error("Couldn't find account")
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)
        post = create(:post, title: 'Original title', account_id: account.id)

        process :update,
                method: :post,
                params: {
                  id: post.id,
                  account_id: account.id,
                  title: 'Updated title'
                }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'deletes a post' do
        post = create(:post, account_id: @account.id)

        expect(@account.posts.count).to eq(1)

        process :destroy,
                method: :delete,
                params: { id: post.id, account_id: @account.id }

        expect(response).to have_http_status(:ok)
        expect(@account.posts.count).to eq(0)
      end

      context 'invalid post_id' do
        it 'returns not_found' do
          process :destroy,
                  method: :delete,
                  params: { id: 0, account_id: @account.id }

          expect(response).to have_http_status(:not_found)
          expect(response.body).to have_error("Couldn't find post")
        end
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)
        post = create(:post, account_id: account.id)

        process :destroy,
                method: :delete,
                params: { id: post.id, account_id: account.id }

        expect(response).to have_http_status(:not_found)
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)
        post = create(:post, account_id: account.id)

        process :destroy,
                method: :delete,
                params: { id: post.id, account_id: account.id }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
