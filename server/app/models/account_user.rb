class AccountUser < ApplicationRecord
  acts_as_paranoid

  belongs_to :account
  belongs_to :user
end
