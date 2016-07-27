require_relative '../../../../rails_helper'

RSpec.describe Api::V0::UsersController, type: :controller do
  describe 'POST #create' do
    it 'returns encoded token and user info' do
      process :create,
              method: :post,
              params: {
                data: {
                  attributes: {
                    name: 'Full name',
                    email: 'email@test.com',
                    password: 'password'
                  }
                }
              }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:created)
      expect(result['meta']['token']).not_to be(nil)
      expect(result['data']['id']).not_to be(nil)
      expect(result['data']['attributes']['email']).to eq('email@test.com')
    end

    it 'returns errors if unsuccessful' do
      process :create,
              method: :post,
              params: {
                data: {
                  attributes: {
                    name: '',
                    email: '',
                    password: ''
                  }
                }
              }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:unprocessable_entity)
      expect(result.to_s).to include("Name can't be blank")
      expect(result.to_s).to include("Email can't be blank")
      expect(result.to_s).to include("Password can't be blank")
    end
  end

  describe 'PATCH #update' do
    context 'authorized' do
      include_context :with_authorized_user

      context 'users own account' do
        it 'updates a user' do
          process :update,
                  method: :patch,
                  params: {
                    id: @user.id,
                    data: { attributes: { name: 'Updated name' } }
                  }

          result = JSON.parse(response.body)
          puts result
          expect(response).to have_http_status(:ok)
          expect(result['data']['id']).to eq(@user.id.to_s)
          expect(result['data']['attributes']['name']).to eq('Updated name')
        end

        it 'returns errors' do
          process :update,
                  method: :patch,
                  params: {
                    id: @user.id,
                    data: { attributes: { name: '' } }
                  }

          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.body).to have_error("Name can't be blank")
        end
      end

      context 'other users account' do
        it 'returns unauthorized' do
          user = create(:user)

          process :update,
                  method: :patch,
                  params: {
                    id: user.id,
                    data: { attributes: { name: 'Updated name' } }
                  }

          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        user = create(:user)

        process :update,
                method: :patch,
                params: {
                  id: user.id,
                  data: { attributes: { name: 'Updated name' } }
                }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
