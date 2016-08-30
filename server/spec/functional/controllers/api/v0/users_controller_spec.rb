require_relative '../../../../rails_helper'

RSpec.describe Api::V0::UsersController, type: :controller do
  describe 'GET #index' do
    include_context :with_authorized_user

    it 'returns a list of users' do
      _user = create(:user, email: 'user@test.com')

      process :index, method: :get, params: { search: 'test' }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(result['data'].length).to be > 0
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
                    name: 'Updated name'
                  }

          result = JSON.parse(response.body)

          expect(response).to have_http_status(:ok)
          expect(result['data']['id']).to eq(@user.id)
          expect(result['data']['name']).to eq('Updated name')
        end

        it 'returns errors' do
          process :update,
                  method: :patch,
                  params: {
                    id: @user.id,
                    name: ''
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
                    name: 'Updated name'
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
                  name: 'Updated name'
                }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
