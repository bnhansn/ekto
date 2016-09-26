require_relative '../../../../rails_helper'

RSpec.describe Api::V1::AccountsController, type: :controller do
  describe 'GET #show' do
    before do
      @account = create(:account)
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
      expect(response.body).to have_error('Account not found by api key invalid') # rubocop:disable LineLength
    end
  end
end
