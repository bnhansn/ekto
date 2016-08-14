require_relative '../../../rails_helper'

describe Savers::Post do
  describe '#create' do
    context 'success' do
      it 'creates a post' do
        attrs = { title: 'New post title' }
        params = ActionController::Parameters.new(attrs)
        user_id = 1
        account = create(:account)

        expect do
          result = Savers::Post.create(user_id, account.id, params)

          expect(result.class).to eq(Post)
          expect(result.title).to eq('New post title')
          expect(result.errors.any?).to eq(false)
        end.to change { Post.count }.from(0).to(1)
      end
    end

    context 'errors' do
      it 'returns errors' do
        attrs = { title: '' }
        params = ActionController::Parameters.new(attrs)
        user_id = nil
        account_id = nil

        expect do
          result = Savers::Post.create(user_id, account_id, params)

          expect(result.errors.full_messages).to include(/Account must exist/)
        end.not_to change { Post.count }
      end
    end
  end

  describe '#update' do
    it 'works' do
      account = create(:account)
      post = create(:post, account_id: account.id)
      attrs = { title: 'Updated post title' }
      params = ActionController::Parameters.new(attrs)
      user_id = 1

      result = Savers::Post.update(post, user_id, account.id, params)

      expect(result.title).to eq('Updated post title')
    end
  end
end
