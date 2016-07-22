require 'rails_helper'

RSpec.describe Api::LoginController, type: :controller do
  describe 'POST #login' do
    it 'returns encoded token and user info with successful login' do
      user = create(:user)

      process :login,
              method: :post,
              params: { email: user.email, password: user.password }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(result['meta']['token']).not_to be(nil)
      expect(result['data']['id']).to eq(user.id.to_s)
      expect(result['data']['attributes']['email']).to eq(user.email)
    end

    it 'returns unauthorized if password is incorrect' do
      user = create(:user, password: 'password')

      process :login,
              method: :post,
              params: { email: user.email, password: 'invalidpassword' }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:unauthorized)
      expect(result['errors'][0]['title']).to match(/Invalid email or password/)
    end

    it 'returns unauthorized if no user is found by email' do
      user = create(:user, email: 'email@test.com')

      process :login,
              method: :post,
              params: { email: 'invalid@test.com', password: user.password }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:unauthorized)
      expect(result['errors'][0]['title']).to match(/Invalid email or password/)
    end
  end
end
