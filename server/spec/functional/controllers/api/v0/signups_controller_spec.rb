require_relative '../../../../rails_helper'

RSpec.describe Api::V0::SignupsController, type: :controller do
  describe 'POST #signup' do
    it 'returns encoded token and user info' do
      process :signup,
              method: :post,
              params: {
                name: 'Full name',
                email: 'email@test.com',
                password: 'password'
              }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:created)
      expect(result['meta']['token']).not_to be(nil)
      expect(result['data']['id']).not_to be(nil)
      expect(result['data']['email']).to eq('email@test.com')
    end

    it 'returns errors if unsuccessful' do
      process :signup,
              method: :post,
              params: {
                name: '',
                email: '',
                password: ''
              }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to have_error("Name can't be blank")
      expect(response.body).to have_error("Email can't be blank")
      expect(response.body).to have_error("Password can't be blank")
    end
  end
end
