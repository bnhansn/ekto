require_relative '../../../rails_helper'

describe Factories::Account do
  describe '#build' do
    before do
      @user = create(:user)
      attrs = {
        description: 'Account description',
        name: 'Account name',
        meta_title: 'Meta title',
        meta_description: 'Meta description'
      }
      @params = ActionController::Parameters.new(attrs)
    end

    it 'assigns passthrough fields' do
      account = Factories::Account.build(@user.id, @params)

      expect(account.description).to eq('Account description')
      expect(account.name).to eq('Account name')
      expect(account.meta_title).to eq('Meta title')
      expect(account.meta_description).to eq('Meta description')
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
