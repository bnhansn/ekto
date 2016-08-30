class AccountUser < ApplicationRecord
  acts_as_paranoid

  belongs_to :account, required: true
  belongs_to :user, required: true

  validates :user_id, uniqueness: { scope: :account_id }
end
