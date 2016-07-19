require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#name' do
    it 'returns the concatenated first and last name' do
      user = build(:user, first_name: 'Ben', last_name: 'Hansen')

      expect(user.name).to eq('Ben Hansen')
    end
  end

  describe '#send_password_reset' do
    it 'saves a url safe token as password_reset_token' do
      user = build(:user)

      user.send_password_reset

      expect(user.password_reset_token.length).to be >= 16
      expect(user.password_reset_token).to match(/^[a-zA-Z0-9_\-]+$/)
    end

    it 'saves current time to password_reset_sent_at' do
      user = build(:user)
      now = Time.zone.now
      Timecop.freeze(now)

      user.send_password_reset

      expect(user.password_reset_sent_at).to eq(now)
    end

    it 'sends an email' do
      user = build(:user)
      ActionMailer::Base.deliveries.clear

      user.send_password_reset

      expect(ActionMailer::Base.deliveries.count).to eq(1)
    end
  end

  describe '#generate_token' do
    it 'saves a url safe token to a database column' do
      user = build(:user)

      user.generate_token(:password_reset_token)

      expect(user.password_reset_token.length).to be >= 16
      expect(user.password_reset_token).to match(/^[a-zA-Z0-9_\-]+$/)
    end
  end

  describe '#reset_password' do
    it 'updates a users password_digest' do
      user = build(:user)
      original_password = user.password_digest

      user.reset_password('password')
      new_password = user.password_digest

      expect(original_password).not_to eq(new_password)
    end
  end
end
