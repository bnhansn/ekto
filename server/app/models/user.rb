class User < ApplicationRecord
  has_secure_password

  has_many :account_users
  has_many :accounts, through: :account_users

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, if: :password_digest_changed?
end
