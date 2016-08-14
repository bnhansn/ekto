class Domain < ApplicationRecord
  belongs_to :account, required: true

  validates :host, presence: true
end
