require_relative '../../../rails_helper'

describe Factories::Account do
  describe '#build' do
    it 'works' do
      attrs = { name: 'Account name' }
      params = ActionController::Parameters.new(attrs)
      user_id = 1

      account = Factories::Account.build(user_id, params)

      expect(account.name).to eq('Account name')
      expect(account.created_by).to eq(user_id)
    end
  end
end
