require_relative '../../../../rails_helper'

RSpec.describe Api::V0::AccountsController, type: :controller do
  describe 'GET #index' do
    context 'authorized' do
      include_context :with_authorized_user

      it 'returns all of the user\'s accounts' do
        account_1 = create(:account)
        account_2 = create(:account)
        create(:account)
        enable_account_access(@user.id, account_1.id)
        enable_account_access(@user.id, account_2.id)

        expect(Account.count).to eq(3)

        process :index

        result = JSON.parse(response.body)
        ids = result['data'].map { |x| x['id'] }

        expect(response).to have_http_status(:ok)
        expect(result['data'].count).to eq(2)
        expect(ids).to include(*[account_1.id.to_s, account_2.id.to_s])
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        process :index

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST #create' do
    context 'authorized' do
      include_context :with_authorized_user

      it 'creates a new account' do
        process :create, method: :post, params: { name: 'New account' }

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:created)
        expect(result['data']['attributes']['name']).to eq('New account')
      end

      it 'returns errors if unsuccessful' do
        process :create, method: :post

        result = JSON.parse(response.body)
        errors = collect_errors(result)

        expect(errors).to include(/Name can't be blank/)
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        process :create, method: :post, params: { name: 'Account name' }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET #show' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'returns an account' do
        process :show, params: { id: @account.id }

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:ok)
        expect(result['data']['id']).to eq(@account.id.to_s)
        expect(result['data']['attributes']['name']).to eq(@account.name)
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)

        process :show, params: { id: account.id }

        expect(response).to have_http_status(:not_found)
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)

        process :show, params: { id: account.id }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST #update' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'updates an account' do
        process :update,
                method: :post,
                params: { id: @account.id, name: 'Updated name' }

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:ok)
        expect(result['data']['id']).to eq(@account.id.to_s)
        expect(result['data']['attributes']['name']).to eq('Updated name')
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)

        process :update,
                method: :post,
                params: { id: account.id, name: 'Updated name' }

        expect(response).to have_http_status(:not_found)
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)

        process :update,
                method: :post,
                params: { id: account.id, name: 'Updated name' }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
