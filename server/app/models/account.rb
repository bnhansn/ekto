class Account < ApplicationRecord
  extend FriendlyId

  has_many :account_users
  has_many :users, through: :account_users
  has_many :posts

  validates :name, presence: true

  friendly_id :slug_candidates, use: :slugged

  def slug_candidates
    [
      :name,
      [:name, :slug_id]
    ]
  end

  def should_generate_new_friendly_id?
    name_changed?
  end
end
