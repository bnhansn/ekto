require_relative '../../../rails_helper'

describe Savers::Account do
  describe '#create' do
    before do
      attrs = { data: { attributes: { name: 'New account name' } } }
      @attrs = ActionController::Parameters.new(attrs)
      @user_id = 1
    end

    context 'success' do
      it 'works' do
        expect do
          result = Savers::Account.create(@user_id, @attrs)

          expect(result.class).to eq(Account)
          expect(result.name).to eq('New account name')
          expect(result.errors.any?).to eq(false)
        end.to change { Account.count }.from(0).to(1)
      end

      it 'enables account access for account creator' do
        user = create(:user)

        result = Savers::Account.create(user.id, @attrs)

        expect(user.accounts).to include(result)
      end

      it 'sets created_by to the account creator' do
        result = Savers::Account.create(@user_id, @attrs)

        expect(result.created_by).to eq(@user_id)
      end
    end

    context 'errors' do
      it 'returns errors' do
        @attrs[:data][:attributes][:name] = ''

        expect do
          result = Savers::Account.create(@user_id, @attrs)

          expect(result.errors.full_messages).to include(/Name can't be blank/)
        end.not_to change { Account.count }
      end

      it 'does not enable account access if save fails' do
        @attrs[:data][:attributes][:name] = ''

        expect do
          Savers::Account.create(@user_id, @attrs)
        end.not_to change { AccountUser.count }
      end
    end
  end

  describe '#update' do
    before do
      @account = create(:account)
      attrs = { data: { attributes: { name: 'Updated account name' } } }
      @attrs = ActionController::Parameters.new(attrs)
    end

    context 'success' do
      it 'works' do
        result = Savers::Account.update(@account, @attrs)

        expect(result.name).to eq('Updated account name')
      end
    end

    context 'errors' do
      it 'returns errors' do
        @attrs[:data][:attributes][:name] = ''

        result = Savers::Account.update(@account, @attrs)

        expect(result.errors.full_messages).to include(/Name can't be blank/)
      end
    end
  end
end
