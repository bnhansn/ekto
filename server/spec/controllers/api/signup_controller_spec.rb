require 'rails_helper'

RSpec.describe Api::SignupController, type: :controller do
  describe 'POST #signup' do
    it 'returns encoded token and user info with successful signup' do
      process :signup,
              method: :post,
              params: {
                first_name: 'First',
                last_name: 'Last',
                email: 'email@test.com',
                password: 'password'
              }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:created)
      expect(result['meta']['token']).not_to be(nil)
      expect(result['data']['id']).not_to be(nil)
      expect(result['data']['attributes']['email']).to eq('email@test.com')
    end

    it 'returns errors if invalid params' do
      process :signup,
              method: :post,
              params: {
                first_name: '',
                last_name: '',
                email: '',
                password: ''
              }

      result = JSON.parse(response.body)
      errors = collect_errors(result)

      expect(response).to have_http_status(:unprocessable_entity)
      expect(errors).to include('First name can\'t be blank')
      expect(errors).to include('Last name can\'t be blank')
      expect(errors).to include('Email can\'t be blank')
      expect(errors).to include('Password can\'t be blank')
    end
  end
end
