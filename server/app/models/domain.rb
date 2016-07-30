class Domain < ApplicationRecord
  belongs_to :account, required: true

  validates :url, presence: true
end
