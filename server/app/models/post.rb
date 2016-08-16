class Post < ApplicationRecord
  acts_as_paranoid
  extend FriendlyId
  friendly_id :title, use: :scoped, scope: :account

  belongs_to :account, required: true

  validates :title, presence: true

  default_scope { order(created_at: :desc) }
  scope :published, -> { where(published: true).order(published_at: :desc) }
end
