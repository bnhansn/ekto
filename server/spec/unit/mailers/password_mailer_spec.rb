require_relative '../../rails_helper'

RSpec.describe PasswordMailer, type: :mailer do
  describe 'password_reset' do
    before do
      @user = build(:user)
      @user.password_reset_token = 'APNv-ANbSRy4el_1KgDWOWg'
    end
    let(:mail) { PasswordMailer.password_reset(@user) }

    it 'renders the headers' do
      expect(mail.subject).to eq('Password reset')
      expect(mail.to).to eq([@user.email])
      expect(mail.from).to eq(['ben@techbient.com'])
    end

    it 'includes the reset password link & token in the email body' do
      expect(mail.body.encoded).to match("https://ekto.tech/reset/#{@user.password_reset_token}") # rubocop:disable LineLength
    end
  end
end
