require_relative '../../../../rails_helper'

RSpec.describe Api::V0::DomainsController, type: :controller do
  describe 'GET #index' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'returns all of the account\'s domains' do
        outside_account = create(:account)
        expect do
          @domain_1 = create(:domain, account_id: @account.id)
          @domain_2 = create(:domain, account_id: @account.id)
          _outise_domain = create(:domain, account_id: outside_account.id)
        end.to change { Domain.count }.from(0).to(3)

        process :index, params: { account_id: @account.id }

        result = JSON.parse(response.body)
        ids = result['data'].map { |x| x['id'] }

        expect(response).to have_http_status(:ok)
        expect(result['data'].count).to eq(2)
        expect(ids).to include(@domain_1.id, @domain_2.id)
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)

        process :index, params: { account_id: account.id }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to have_error("Couldn't find account")
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)

        process :index, params: { account_id: account.id }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST #create' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'creates a new domain' do
        process :create,
                method: :post,
                params: {
                  account_id: @account.id,
                  url: 'http://test.com'
                }

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:created)
        expect(result['data']['id']).not_to be(nil)
        expect(result['data']['url']).to eq('http://test.com')
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)

        process :create,
                method: :post,
                params: {
                  account_id: account.id,
                  url: 'http://test.com'
                }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to have_error("Couldn't find account")
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)

        process :create,
                method: :post,
                params: {
                  account_id: account.id,
                  url: 'http://test.com'
                }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'authorized' do
      include_context :with_authorized_user_and_account

      it 'deletes a domain' do
        domain = create(:domain, account_id: @account.id)

        expect(@account.domains.count).to eq(1)

        process :destroy,
                method: :delete,
                params: { id: domain.id, account_id: @account.id }

        expect(response).to have_http_status(:ok)
        expect(@account.domains.count).to eq(0)
      end

      context 'invalid domain_id' do
        it 'returns not_found' do
          process :destroy,
                  method: :delete,
                  params: { id: 0, account_id: @account.id }

          expect(response).to have_http_status(:not_found)
          expect(response.body).to have_error("Couldn't find domain")
        end
      end
    end

    context 'authorized user unauthorized account' do
      include_context :with_authorized_user

      it 'returns not_found' do
        account = create(:account)
        domain = create(:domain, account_id: account.id)

        process :destroy,
                method: :delete,
                params: { id: domain.id, account_id: account.id }

        expect(response).to have_http_status(:not_found)
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)
        domain = create(:domain, account_id: account.id)

        process :destroy,
                method: :delete,
                params: { id: domain.id, account_id: account.id }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
