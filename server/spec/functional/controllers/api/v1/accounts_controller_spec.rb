require_relative '../../../../rails_helper'

RSpec.describe Api::V1::AccountsController, type: :controller do
  describe 'GET #show' do
    before do
      @account = create(:account)
      @test_origin = 'http://test.com'
      request.env['HTTP_ORIGIN'] = @test_origin
    end

    context 'authorized origin' do
      before do
        Domain.create(account_id: @account.id, host: @test_origin)
      end

      it 'returns an account' do
        process :show,
                method: :get,
                params: { id: @account.key }

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:ok)
        expect(result['data']['id']).to eq(@account.id)
      end

      it 'return not found if invalid key' do
        process :show, method: :get, params: { id: 'invalid' }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to have_error('Account not found by id invalid')
      end
    end

    context 'unauthorized origin' do
      it 'returns unauthorized' do
        process :show, method: :get, params: { id: @account.key }

        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to have_error(
          "Domain #{@test_origin} not whitelisted for account #{@account.key}"
        )
      end
    end
  end
end
