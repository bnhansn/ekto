class Account < ApplicationRecord
  acts_as_paranoid
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :account_users, dependent: :destroy
  has_many :users, through: :account_users
  has_many :posts, dependent: :destroy
  has_many :domains, dependent: :destroy

  validates :name, presence: true
  validates :key, presence: true, uniqueness: true

  def whitelist_hosts
    domains.map(&:host)
  end
end
