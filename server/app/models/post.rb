class Post < ApplicationRecord
  extend FriendlyId

  belongs_to :account, required: true

  validates :title, presence: true

  default_scope { order(created_at: :desc) }
  scope :published, -> { where(published: true).order(published_at: :desc) }

  friendly_id :slug_candidates, use: :scoped, scope: :account

  def slug_candidates
    [
      :slug_candidate,
      [:slug_candidate, :slug_id]
    ]
  end

  def should_generate_new_friendly_id?
    slug_candidate_changed?
  end
end
