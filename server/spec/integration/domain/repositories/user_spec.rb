require_relative '../../../rails_helper'

describe Repositories::User do
  describe '#search' do
    before do
      _user_1 = create(:user, name: 'Mac', email: 'mac@icloud.com')
      _user_2 = create(:user, name: 'Mindy', email: 'mindy@gmail.com')
      _user_3 = create(:user, name: 'Michelle', email: 'michelle@aol.com')
    end

    it 'returns no results if no query' do
      result = Repositories::User.search('')

      expect(result.length).to eq(0)
    end

    it 'searches by name' do
      result = Repositories::User.search('Mindy')

      expect(result.first.name).to match('Mindy')
    end

    it 'searches by email' do
      result = Repositories::User.search('michelle@aol.com')

      expect(result.first.email).to match('michelle@aol.com')
    end
  end
end
