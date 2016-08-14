require_relative '../../../../rails_helper'

RSpec.describe Api::V1::PostsController, type: :controller do
  describe 'GET #index' do
    before do
      @account = create(:account)
    end

    it 'returns an accounts posts' do
      post_1 = create(:post, account_id: @account.id)
      post_2 = create(:post, account_id: @account.id)
      _post = create(:post)
      Domain.create(account_id: @account.id, host: 'test.host')

      process :index, method: :get, params: { account_id: @account.key }

      result = JSON.parse(response.body)
      ids = result['data'].map { |x| x['id'] }

      expect(response).to have_http_status(:ok)
      expect(result['data'].count).to eq(2)
      expect(ids).to include(post_1.id, post_2.id)
    end

    it 'return not found if invalid key' do
      process :index, method: :get, params: { account_id: 'invalidkey' }

      expect(response).to have_http_status(:not_found)
      expect(response.body).to have_error('Account not found by id invalidkey')
    end

    it 'returns unauthorized if unapproved host' do
      process :index, method: :get, params: { account_id: @account.key }

      expect(response).to have_http_status(:unauthorized)
      expect(response.body).to have_error('Domain not whitelisted for account')
    end
  end

  describe 'GET #show' do
    before do
      @account = create(:account)
      @post = create(:post, account_id: @account.id)
    end

    it 'returns a post' do
      Domain.create(account_id: @account.id, host: 'test.host')

      process :show,
              method: :get,
              params: { account_id: @account.key, id: @post.id }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(result['data']['id']).to eq(@post.id)
    end

    it 'returns not found if invalid post id' do
      Domain.create(account_id: @account.id, host: 'test.host')

      process :show,
              method: :get,
              params: { account_id: @account.key, id: 0 }

      expect(response).to have_http_status(:not_found)
      expect(response.body).to have_error("Couldn't find post")
    end

    it 'return not found if invalid key' do
      process :show,
              method: :get,
              params: { account_id: 'invalidkey', id: @post.id }

      expect(response).to have_http_status(:not_found)
      expect(response.body).to have_error('Account not found by id invalidkey')
    end

    it 'returns unauthorized if unapproved host' do
      process :show,
              method: :get,
              params: { account_id: @account.key, id: @post.id }

      expect(response).to have_http_status(:unauthorized)
      expect(response.body).to have_error('Domain not whitelisted')
    end
  end
end
