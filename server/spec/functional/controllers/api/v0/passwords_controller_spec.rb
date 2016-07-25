require_relative '../../../../rails_helper'

RSpec.describe Api::V0::PasswordsController, type: :controller do
  describe 'POST #forgot' do
    it 'sends password reset email' do
      user = create(:user)

      expect do
        process :forgot, method: :post, params: { email: user.email }
      end.to change { ActionMailer::Base.deliveries.count }.from(0).to(1)

      email = ActionMailer::Base.deliveries.last

      expect(email.subject).to eq('Password reset')
      expect(response).to have_http_status(:ok)
    end

    it 'returns error if user is not found' do
      process :reset, method: :post, params: { email: 'xxx' }

      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'POST #reset' do
    it 'returns encoded token and user info' do
      user = create(
        :user,
        password_reset_sent_at: Time.zone.now,
        password_reset_token: 'token'
      )

      process :reset,
              method: :post,
              params: { token: user.password_reset_token, password: 'password' }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(result['meta']['token']).not_to be(nil)
      expect(result['data']['id']).to eq(user.id.to_s)
      expect(result['data']['attributes']['email']).to eq(user.email)
    end

    it 'returns errors' do
      user = create(
        :user,
        password_reset_sent_at: Time.zone.now,
        password_reset_token: 'token'
      )

      process :reset,
              method: :post,
              params: { token: user.password_reset_token, password: 'x' }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to have_error('Password is too short')
    end
  end
end
