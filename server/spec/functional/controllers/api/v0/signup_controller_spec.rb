require_relative '../../../../rails_helper'

RSpec.describe Api::V0::SignupController, type: :controller do
  describe 'POST #signup' do
    it 'returns encoded token and user info with successful signup' do
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
      expect(result['data']['attributes']['email']).to eq('email@test.com')
    end

    it 'returns errors if unsuccessful' do
      process :signup,
              method: :post,
              params: {
                name: '',
                email: '',
                password: ''
              }

      result = JSON.parse(response.body)

      errors = collect_errors(result)
      expect(response).to have_http_status(:unprocessable_entity)
      expect(errors).to include('Name can\'t be blank')
      expect(errors).to include('Email can\'t be blank')
      expect(errors).to include('Password can\'t be blank')
    end
  end
end
