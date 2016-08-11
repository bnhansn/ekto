require_relative '../../../rails_helper'

describe Factories::Account do
  describe '#build' do
    it 'works' do
      attrs = { data: { attributes: { name: 'Account name' } } }
      params = ActionController::Parameters.new(attrs)
      user_id = 1

      account = Factories::Account.build(user_id, params)

      expect(account.name).to eq('Account name')
    end

    it 'sets owner_id to account creator id' do
      attrs = { data: { attributes: { name: 'Account name' } } }
      params = ActionController::Parameters.new(attrs)
      user = create(:user)

      account = Factories::Account.build(user.id, params)

      expect(account.owner_id).to eq(user.id)
    end
  end

  describe '#assign' do
    it 'works' do
      account = create(:account)
      attrs = { data: { attributes: { name: 'Updated name' } } }
      params = ActionController::Parameters.new(attrs)

      account = Factories::Account.build(account, params)

      expect(account.name).to eq('Updated name')
    end
  end
end
