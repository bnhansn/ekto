require 'rails_helper'

RSpec.describe PasswordMailer, type: :mailer do
  describe 'password_reset' do
    before do
      @user = build(:user)
      @user.generate_token(:password_reset_token)
    end
    let(:mail) { PasswordMailer.password_reset(@user) }

    it 'renders the headers' do
      expect(mail.subject).to eq('Password reset')
      expect(mail.to).to eq([@user.email])
      expect(mail.from).to eq(['ben@techbient.com'])
    end

    it 'includes the password_reset_token in the email body' do
      expect(mail.body.encoded).to match(@user.password_reset_token)
    end
  end
end
