require 'rails_helper'
require 'json_web_token'

RSpec.describe Api::AuthenticationController, type: :controller do
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

    it 'returns unauthorized if no jwt is received' do
      process :authenticate, method: :post, params: {}

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:unauthorized)
      expect(result['errors'][0]['title']).to match(/Unauthorized/)
    end

    it 'returns not_found if no valid user_id is in decoded jwt' do
      token = JsonWebToken.encode(user_id: 0)

      process :authenticate, method: :post, params: { token: token }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:not_found)
      expect(result['errors'][0]['title']).to match(/Couldn't find user/)
    end
  end
end
