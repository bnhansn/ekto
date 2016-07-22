class User < ApplicationRecord
  has_secure_password

  has_many :account_users
  has_many :accounts, through: :account_users

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, if: :password_digest_changed?

  def send_password_reset
    generate_token(:password_reset_token)
    self.password_reset_sent_at = Time.zone.now
    save
    PasswordMailer.password_reset(self).deliver_now
  end

  def generate_token(column)
    loop do
      self[column] = SecureRandom.urlsafe_base64
      break unless User.exists?(column => self[column])
    end
  end

  def reset_password(password)
    self.password = password
    save
  end
end
