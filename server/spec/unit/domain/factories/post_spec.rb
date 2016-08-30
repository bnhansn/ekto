require_relative '../../../rails_helper'

describe Factories::Post do
  before do
    attrs = {
      author_id: 1,
      featured: true,
      html: '<div>test</div>',
      markdown: '#Header',
      meta_description: 'Meta description',
      meta_title: 'Meta title',
      title: 'Post title',
      image: 'http://google.com',
      published: true,
      published_at: Date.today,
      slug: 'test-slug'
    }
    @params = ActionController::Parameters.new(attrs)
    @user_id = 1
    @account_id = 1
  end

  describe '#build' do
    it 'accepts sanitized parameters' do
      post = Factories::Post.build(@user_id, @account_id, @params)

      expect(post.author_id).to eq(1)
      expect(post.featured).to eq(true)
      expect(post.html).to eq('<div>test</div>')
      expect(post.markdown).to eq('#Header')
      expect(post.meta_description).to eq('Meta description')
      expect(post.meta_title).to eq('Meta title')
      expect(post.title).to eq('Post title')
      expect(post.image).to eq('http://google.com')
      expect(post.published).to eq(true)
      expect(post.published_at).to eq(Date.today)
      expect(post.slug).to eq('test-slug')
    end

    it 'sets default parameters' do
      attrs = { html: '<div></div>' }
      params = ActionController::Parameters.new(attrs)

      post = Factories::Post.build(@user_id, @account_id, params)

      expect(post.author_id).to eq(@user_id)
      expect(post.account_id).to eq(@account_id)
      expect(post.created_by).to eq(@user_id)
      expect(post.title).to eq('Untitled')
      expect(post.slug).to eq('untitled')
    end
  end

  describe '#assign' do
    it 'accepts sanitized parameters' do
      post = create(:post)

      post = Factories::Post.assign(post, @user_id, @account_id, @params)

      expect(post.author_id).to eq(1)
      expect(post.featured).to eq(true)
      expect(post.html).to eq('<div>test</div>')
      expect(post.markdown).to eq('#Header')
      expect(post.meta_description).to eq('Meta description')
      expect(post.meta_title).to eq('Meta title')
      expect(post.title).to eq('Post title')
      expect(post.image).to eq('http://google.com')
      expect(post.published).to eq(true)
      expect(post.published_at).to eq(Date.today)
      expect(post.slug).to eq('test-slug')
    end

    it 'resets null default parameters' do
      post = create(:post)
      attrs = { title: '', slug: '' }
      params = ActionController::Parameters.new(attrs)

      post = Factories::Post.assign(post, @user_id, @account_id, params)

      expect(post.author_id).to eq(@user_id)
      expect(post.title).to eq('Untitled')
      expect(post.slug).to eq('untitled')
    end
  end
end
