require_relative '../../../../rails_helper'
require_relative '../../../../../lib/json_web_token'

RSpec.describe Api::V0::AuthenticationController, type: :controller do
  describe 'POST #authenticate' do
    it 'responds with encoded token and user info if jwt is valid' do
      user = create(:user)
      token = JsonWebToken.encode(user_id: user.id)

      process :authenticate, method: :post, params: { token: token }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(result['meta']['token']).not_to be(nil)
      expect(result['data']['id']).to eq(user.id)
      expect(result['data']['email']).to eq(user.email)
    end

    it 'handles errors' do
      process :authenticate, method: :post

      expect(response).to have_http_status(:unauthorized)
      expect(response.body).to have_error('Unauthorized')
    end
  end
end
