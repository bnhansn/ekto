class Post < ApplicationRecord
  acts_as_paranoid
  extend FriendlyId
  friendly_id :title, use: :scoped, scope: :account

  belongs_to :account, required: true
  belongs_to :author, class_name: 'User', foreign_key: :author_id

  validates :title, presence: true
  validates :slug, uniqueness: {
    scope: :account_id,
    conditions: -> { where(deleted_at: nil) }
  }

  default_scope { order(created_at: :desc) }
  scope :published, -> { where(published: true).order(published_at: :desc) }
end
