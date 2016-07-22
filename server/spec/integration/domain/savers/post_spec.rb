require 'rails_helper'

describe Savers::Post do
  describe '#create' do
    it 'works with params' do
      attrs = { title: 'New post title' }
      params = ActionController::Parameters.new(attrs)
      user_id = 1
      account_id = 1

      expect do
        result = Savers::Post.create(user_id, account_id, params)

        expect(result.class).to eq(Post)
        expect(result.title).to eq('New post title')
        expect(result.errors.any?).to eq(false)
      end.to change { Post.count }.from(0).to(1)
    end

    it 'works with empty params' do
      attrs = {}
      params = ActionController::Parameters.new(attrs)
      user_id = 1
      account_id = 1

      expect do
        result = Savers::Post.create(user_id, account_id, params)

        expect(result.class).to eq(Post)
        expect(result.errors.any?).to eq(false)
      end.to change { Post.count }.from(0).to(1)
    end
  end

  describe '#update' do
    it 'works' do
      post = create(:post)
      attrs = { title: 'Updated post title' }
      params = ActionController::Parameters.new(attrs)
      user_id = 1

      result = Savers::Post.update(post, user_id, params)

      expect(result.title).to eq('Updated post title')
    end
  end
end
