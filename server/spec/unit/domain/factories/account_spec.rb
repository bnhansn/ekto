require_relative '../../../rails_helper'

describe Factories::Account do
  describe '#build' do
    before do
      @user = create(:user)
      attrs = { name: 'Account name' }
      @params = ActionController::Parameters.new(attrs)
    end

    it 'assigns passthrough fields' do
      account = Factories::Account.build(@user.id, @params)

      expect(account.name).to eq('Account name')
    end

    it 'sets owner_id to account creator id' do
      account = Factories::Account.build(@user.id, @params)

      expect(account.owner_id).to eq(@user.id)
    end

    it 'creates 10 character random key' do
      account = Factories::Account.build(@user.id, @params)

      expect(account.key).to match(/^[a-zA-Z0-9]{10,}/)
    end

    it 'creates slug as parameterized name' do
      result = Savers::Account.create(@user_id, @params)

      expect(result.slug).to eq(result.name.parameterize)
    end
  end

  describe '#assign' do
    it 'works' do
      account = create(:account)
      attrs = { name: 'Updated name' }
      params = ActionController::Parameters.new(attrs)

      account = Factories::Account.build(account, params)

      expect(account.name).to eq('Updated name')
    end
  end
end
