require 'rails_helper'

describe Factories::Post do
  describe '#build' do
    it 'accepts sanitized parameters' do
      attrs = {
        author_id: 1,
        featured: true,
        html: '<div>test</div>',
        markdown: '#Header',
        title: 'Post title',
        image: 'http://google.com',
        published: true,
        published_at: Date.today,
        published_by: 1,
        slug_candidate: 'slug-candidate'
      }
      params = ActionController::Parameters.new(attrs)
      user_id = 1
      account_id = 1

      post = Factories::Post.build(user_id, account_id, params)

      expect(post.author_id).to eq(1)
      expect(post.featured).to eq(true)
      expect(post.html).to eq('<div>test</div>')
      expect(post.markdown).to eq('#Header')
      expect(post.title).to eq('Post title')
      expect(post.image).to eq('http://google.com')
      expect(post.published).to eq(true)
      expect(post.published_at).to eq(Date.today)
      expect(post.published_by).to eq(1)
      expect(post.slug_candidate).to eq('slug-candidate')
    end

    it 'sets default parameters' do
      attrs = {}
      params = ActionController::Parameters.new(attrs)
      user_id = 1
      account_id = 1

      post = Factories::Post.build(user_id, account_id, params)

      expect(post.account_id).to eq(account_id)
      expect(post.created_by).to eq(user_id)
      expect(post.title).to eq('Untitled')
      expect(post.slug_candidate).to eq('untitled')
      expect(post.slug_id).not_to be(nil)
    end
  end

  describe '#assign' do
    it 'accepts sanitized parameters' do
      post = create(:post)
      attrs = {
        author_id: 1,
        featured: true,
        html: '<div>test</div>',
        markdown: '#Header',
        title: 'Post title',
        image: 'http://google.com',
        published: true,
        published_at: Date.today,
        published_by: 1,
        slug_candidate: 'slug-candidate'
      }
      params = ActionController::Parameters.new(attrs)
      user_id = 1

      post = Factories::Post.build(post, user_id, params)

      expect(post.author_id).to eq(1)
      expect(post.featured).to eq(true)
      expect(post.html).to eq('<div>test</div>')
      expect(post.markdown).to eq('#Header')
      expect(post.title).to eq('Post title')
      expect(post.image).to eq('http://google.com')
      expect(post.published).to eq(true)
      expect(post.published_at).to eq(Date.today)
      expect(post.published_by).to eq(1)
      expect(post.slug_candidate).to eq('slug-candidate')
    end

    it 'resets null default parameters' do
      post = create(:post)
      attrs = { title: '', slug_candidate: '' }
      params = ActionController::Parameters.new(attrs)
      user_id = 1

      post = Factories::Post.assign(post, user_id, params)

      expect(post.title).to eq('Untitled')
      expect(post.slug_candidate).to eq('untitled')
    end
  end
end
