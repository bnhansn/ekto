class Post < ApplicationRecord
  belongs_to :account

  validates :title, presence: true
  validates :slug, presence: true, uniqueness: { scope: :account_id }

  before_validation :set_defaults
  before_validation :generate_unique_slug, if: :slug_blank?
  before_validation :parameterize_slug, if: :slug_updated?

  default_scope { order(created_at: :desc) }
  scope :published, -> { where(published: true).order(published_at: :desc) }

  private

  def set_defaults
    self.title = 'Post title' unless title.present?
  end

  def generate_unique_slug
    index = 1
    loop do
      self.slug = "#{title.parameterize}#{index == 1 ? '' : "-#{index}"}"
      break if slug_unique?
      index += 1
    end
  end

  def parameterize_slug
    self.slug = slug.parameterize
  end

  def slug_unique?
    true unless Post.exists?(slug: slug, account: account)
  end

  def slug_blank?
    true if slug.blank?
  end

  def slug_updated?
    true if slug_changed?
  end
end
