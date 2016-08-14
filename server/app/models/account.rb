class Account < ApplicationRecord
  acts_as_paranoid
  extend FriendlyId

  has_many :account_users, dependent: :destroy
  has_many :users, through: :account_users
  has_many :posts, dependent: :destroy
  has_many :domains, dependent: :destroy

  validates :name, presence: true
  validates :key, presence: true, uniqueness: true

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

  def whitelist_hosts
    domains.map(&:host)
  end
end
