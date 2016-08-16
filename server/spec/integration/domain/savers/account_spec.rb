require_relative '../../../rails_helper'

describe Savers::Account do
  describe '#create' do
    before do
      attrs = { name: 'New account name' }
      @params = ActionController::Parameters.new(attrs)
      @user_id = 1
    end

    context 'success' do
      it 'works' do
        expect do
          result = Savers::Account.create(@user_id, @params)

          expect(result.class).to eq(Account)
          expect(result.name).to eq('New account name')
          expect(result.errors.any?).to eq(false)
        end.to change { Account.count }.from(0).to(1)
      end

      it 'enables account access for account creator' do
        user = create(:user)

        result = Savers::Account.create(user.id, @params)

        expect(user.accounts).to include(result)
      end

      it 'sets owner_id to the account creator' do
        result = Savers::Account.create(@user_id, @params)

        expect(result.owner_id).to eq(@user_id)
      end

      it 'assigns unique slug scoped to name' do
        attrs = { name: 'Same name' }
        params = ActionController::Parameters.new(attrs)

        account_1 = Savers::Account.create(@user_id, params)
        account_2 = Savers::Account.create(@user_id, params)

        expect(account_1.slug).not_to eq(account_2.slug)
      end
    end

    context 'errors' do
      it 'returns errors' do
        @params[:name] = ''

        expect do
          result = Savers::Account.create(@user_id, @params)

          expect(result.errors.full_messages).to include(/Name can't be blank/)
        end.not_to change { Account.count }
      end

      it 'does not enable account access if save fails' do
        @params[:name] = ''

        expect do
          Savers::Account.create(@user_id, @params)
        end.not_to change { AccountUser.count }
      end
    end
  end

  describe '#update' do
    before do
      @account = create(:account)
      attrs = { name: 'Updated account name' }
      @params = ActionController::Parameters.new(attrs)
    end

    context 'success' do
      it 'works' do
        result = Savers::Account.update(@account, @params)

        expect(result.name).to eq('Updated account name')
      end
    end

    context 'errors' do
      it 'returns errors' do
        @params[:name] = ''

        result = Savers::Account.update(@account, @params)

        expect(result.errors.full_messages).to include(/Name can't be blank/)
      end
    end
  end
end
