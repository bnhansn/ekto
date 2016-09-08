# rubocop:disable LineLength
require_relative '../../../rails_helper'

describe Repositories::Post do
  describe '#internal_query' do
    it 'works' do
      account = create(:account)
      _post = create(:post, account_id: account.id)
      _post = create(:post, account_id: account.id)
      params = ActionController::Parameters.new({})

      posts = Repositories::Post.internal_query(account, params)

      expect(posts.length).to eq(2)
    end
  end

  describe '#external_query' do
    it 'returns published posts' do
      account = create(:account)
      _post = create(:post, account_id: account.id, published: true)
      _post = create(:post, account_id: account.id, published: true)
      _unpublished_post = create(:post, account_id: account.id)
      params = ActionController::Parameters.new({})

      posts = Repositories::Post.external_query(account, params)

      expect(posts.length).to eq(2)
    end

    it 'searches by title' do
      account = create(:account)
      _post_1 = create(:post, account_id: account.id, published: true, title: 'Test')
      post_2 = create(:post, account_id: account.id, published: true, title: 'Match')
      params = ActionController::Parameters.new(search: 'Match')

      posts = Repositories::Post.external_query(account, params)

      expect(posts.first.id).to eq(post_2.id)
    end

    it 'searches by markdown' do
      account = create(:account)
      _post_1 = create(:post, account_id: account.id, published: true, markdown: 'Test')
      post_2 = create(:post, account_id: account.id, published: true, markdown: 'Match')
      params = ActionController::Parameters.new(search: 'Match')

      posts = Repositories::Post.external_query(account, params)

      expect(posts.first.id).to eq(post_2.id)
    end

    it 'orders by published data' do
      account = create(:account)
      newest_post = create(:post, account_id: account.id, published: true, published_at: 1.day.ago)
      oldest_post = create(:post, account_id: account.id, published: true, published_at: 3.days.ago)
      _post = create(:post, account_id: account.id, published: true, published_at: 2.days.ago)
      params = ActionController::Parameters.new({})

      posts = Repositories::Post.external_query(account, params)

      expect(posts.first.id).to eq(newest_post.id)
      expect(posts.last.id).to eq(oldest_post.id)
    end
  end
end
