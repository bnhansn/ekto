require 'rails_helper'

RSpec.describe Api::PasswordsController, type: :controller do
  describe 'POST #forgot' do
    it 'sends password reset email if user if found by email' do
      user = create(:user)
      ActionMailer::Base.deliveries.clear

      process :forgot, method: :post, params: { email: user.email }

      email = ActionMailer::Base.deliveries.last
      expect(ActionMailer::Base.deliveries.count).to eq(1)
      expect(email.subject).to eq('Password reset')
      expect(response).to have_http_status(:ok)
    end

    it 'returns 200 status if params are empty' do
      process :forgot, method: :post, params: {}

      expect(response).to have_http_status(:ok)
    end

    it 'returns 200 status if email in not found' do
      process :forgot, method: :post, params: { email: 'xxx' }

      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST #reset' do
    it 'returns encoded token and user info' do
      user = create(:user, password_reset_sent_at: Time.zone.now)
      user.generate_token(:password_reset_token)
      user.save

      process :reset,
              method: :post,
              params: { token: user.password_reset_token, password: 'password' }

      result = JSON.parse(response.body)
      expect(response).to have_http_status(:ok)
      expect(result['meta']['token']).not_to be(nil)
      expect(result['data']['id']).to eq(user.id.to_s)
      expect(result['data']['attributes']['email']).to eq(user.email)
    end

    it 'returns error if new password is too short' do
      user = create(:user, password_reset_sent_at: Time.zone.now)
      user.generate_token(:password_reset_token)
      user.save

      process :reset,
              method: :post,
              params: { token: user.password_reset_token, password: 'x' }
      result = JSON.parse(response.body)

      expect(response).to have_http_status(:unprocessable_entity)
      expect(result['errors'][0]['title']).to match(/Password is too short/)
    end

    it 'returns forbidden if password_reset_token is expired' do
      user = create(:user, password_reset_sent_at: 1.year.ago)
      user.generate_token(:password_reset_token)
      user.save

      process :reset,
              method: :post,
              params: { token: user.password_reset_token, password: 'password' }
      result = JSON.parse(response.body)

      expect(response).to have_http_status(:forbidden)
      expect(result['errors'][0]['title']).to match(/token has expired/)
    end
  end
end
