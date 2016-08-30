require_relative '../../rails_helper'

RSpec.describe InvitationMailer, type: :mailer do
  describe 'new_user_invitation' do
    before do
      @user = create(:user)
      @account = create(:account)
    end
    let(:mail) { InvitationMailer.new_user_invitation(@user, @account) }

    it 'renders the correct headers' do
      expect(mail.subject).to eq('Ekto blog invite')
      expect(mail.to).to eq([@user.email])
      expect(mail.from).to eq(['ben@techbient.com'])
    end

    it 'includes the user name in the email' do
      expect(mail.body.encoded).to match(@user.name)
    end

    it 'includes the account name in the email' do
      expect(mail.body.encoded).to match(@account.name)
    end

    it 'includes a signup link in the email' do
      expect(mail.body.encoded).to match('http://ekto.tech')
    end
  end
end
