require 'rails_helper'

RSpec.describe Api::PostsController, type: :controller do
  describe 'GET #index' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'returns all of the account\'s posts' do
        outside_account = create(:account)
        post_1 = create(:post, account_id: @account.id)
        post_2 = create(:post, account_id: @account.id)
        create(:post, account_id: outside_account.id)

        process :index, params: { account_id: @account.id }

        result = JSON.parse(response.body)
        ids = result['data'].map { |x| x['id'] }
        expect(response).to have_http_status(:ok)
        expect(result['data'].count).to eq(2)
        expect(ids).to include(*[post_1.id.to_s, post_2.id.to_s])
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)

        process :index, params: { account_id: account.id }

        result = JSON.parse(response.body)
        expect(response).to have_http_status(:not_found)
        expect(result['errors'][0]['title']).to match(/Couldn't find account/)
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

      it 'creates and returns a new post' do
        process :create,
                method: :post,
                params: { account_id: @account.id, title: 'New post title' }

        result = JSON.parse(response.body)
        expect(response).to have_http_status(:created)
        expect(result['data']['id']).not_to be(nil)
        expect(result['data']['attributes']['title']).to eq('New post title')
        expect(result['data']['attributes']['createdBy']).not_to be(nil)
      end

      it 'creates post with default values if no post params' do
        process :create, method: :post, params: { account_id: @account.id }

        result = JSON.parse(response.body)
        expect(response).to have_http_status(:created)
        expect(result['data']['id']).not_to be(nil)
        expect(result['data']['attributes']['title']).not_to be(nil)
        expect(result['data']['attributes']['slug']).not_to be(nil)
      end

      it 'sets created_by & updated_by to current user' do
        process :create, method: :post, params: { account_id: @account.id }

        result = JSON.parse(response.body)
        expect(result['data']['attributes']['createdBy']).to eq(@user.id)
        expect(result['data']['attributes']['updatedBy']).to eq(@user.id)
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)

        process :create,
                method: :post,
                params: { account_id: account.id, title: 'New post title' }

        result = JSON.parse(response.body)
        expect(response).to have_http_status(:not_found)
        expect(result['errors'][0]['title']).to match(/Couldn't find account/)
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)

        process :create,
                method: :post,
                params: { account_id: account.id, title: 'New post title' }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST #update' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'updates and returns a post' do
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
        expect(result['data']['id']).to eq(post.id.to_s)
        expect(result['data']['attributes']['title']).to eq('Updated title')
      end

      it 'sets updated_by to current user' do
        post = create(:post, account_id: @account.id)

        process :update,
                method: :post,
                params: { id: post.id, account_id: @account.id }

        result = JSON.parse(response.body)
        expect(result['data']['attributes']['updatedBy']).to eq(@user.id)
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

        result = JSON.parse(response.body)
        expect(response).to have_http_status(:not_found)
        expect(result['errors'][0]['title']).to match(/Couldn't find account/)
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

          result = JSON.parse(response.body)
          expect(response).to have_http_status(:not_found)
          expect(result['errors'][0]['title']).to match(/Couldn't find post/)
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
