require_relative '../../../../rails_helper'

RSpec.describe Api::V1::PostsController, type: :controller do
  describe 'GET #index' do
    before do
      @account = create(:account)
      @test_origin = 'test.com'
      request.env['HTTP_ORIGIN'] = @test_origin
    end

    context 'authorized origin' do
      before do
        Domain.create(account_id: @account.id, host: @test_origin)
      end

      it 'returns an accounts published posts' do
        post_1 = create(:post, account_id: @account.id, published: true)
        post_2 = create(:post, account_id: @account.id, published: true)
        _unpublished_post = create(:post, account_id: @account.id)
        _outside_post = create(:post)

        process :index,
                method: :get,
                params: { account_id: @account.key }

        result = JSON.parse(response.body)
        ids = result['data'].map { |x| x['id'] }

        expect(response).to have_http_status(:ok)
        expect(result['data'].count).to eq(2)
        expect(ids).to include(post_1.id, post_2.id)
      end

      it 'includes pagination' do
        _post = create(:post, account_id: @account.id, published: true)
        _post = create(:post, account_id: @account.id, published: true)
        _post = create(:post, account_id: @account.id, published: true)

        process :index, params: { account_id: @account.key }

        result = JSON.parse(response.body)

        expect(result['meta']).to have_key('currentPage')
        expect(result['meta']).to have_key('nextPage')
        expect(result['meta']).to have_key('prevPage')
        expect(result['meta']).to have_key('totalPages')
        expect(result['meta']).to have_key('totalCount')
      end

      it 'return not found if invalid key' do
        process :index, method: :get, params: { account_id: 'invalid' }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to have_error('Account not found by id invalid')
      end
    end

    context 'unauthorized origin' do
      it 'returns unauthorized' do
        process :index, method: :get, params: { account_id: @account.key }

        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to have_error(
          "Domain #{@test_origin} not whitelisted for account #{@account.key}"
        )
      end
    end
  end

  describe 'GET #show' do
    before do
      @account = create(:account)
      @post = create(:post, account_id: @account.id, published: true)
      @test_origin = 'test.com'
      request.env['HTTP_ORIGIN'] = @test_origin
    end

    context 'authorized origin' do
      before do
        Domain.create(account_id: @account.id, host: @test_origin)
      end

      it 'returns a post' do
        process :show,
                method: :get,
                params: { account_id: @account.key, id: @post.id }

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:ok)
        expect(result['data']['id']).to eq(@post.id)
      end

      it 'returns not found if post is unpublished' do
        unpublished_post = create(:post, account_id: @account.id)

        process :show,
                method: :get,
                params: { account_id: @account.key, id: unpublished_post.id }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to have_error("Couldn't find post")
      end

      it 'returns not found if invalid post id' do
        process :show,
                method: :get,
                params: { account_id: @account.key, id: 0 }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to have_error("Couldn't find post")
      end

      it 'return not found if invalid key' do
        process :show,
                method: :get,
                params: { account_id: 'invalid', id: @post.id }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to have_error('Account not found by id invalid')
      end
    end

    context 'unauthorized origin' do
      it 'returns unauthorized' do
        process :show,
                method: :get,
                params: { account_id: @account.key, id: @post.id }

        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to have_error(
          "Domain #{@test_origin} not whitelisted for account #{@account.key}"
        )
      end
    end
  end
end
