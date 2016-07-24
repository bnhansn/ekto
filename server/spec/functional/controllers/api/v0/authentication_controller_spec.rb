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
      expect(result['data']['id']).to eq(user.id.to_s)
      expect(result['data']['attributes']['email']).to eq(user.email)
    end

    it 'handles errors' do
      process :authenticate, method: :post

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:unauthorized)
      expect(result['errors'][0]['title']).to match(/Unauthorized/)
    end
  end
end
