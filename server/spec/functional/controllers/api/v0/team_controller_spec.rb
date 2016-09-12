require_relative '../../../../rails_helper'
include ActiveJob::TestHelper

RSpec.describe Api::V0::TeamController, type: :controller do
  describe 'POST #invite_new' do
    context 'authenticated account owner' do
      include_context :with_authorized_account_owner

      context 'success' do
        it 'creates a user' do
          expect do
            process :invite_new,
                    method: :post,
                    params: {
                      name: 'Full name',
                      email: 'email@test.com',
                      account_id: @account.id
                    }

            result = JSON.parse(response.body)

            expect(response).to have_http_status(:created)
            expect(result['data']['name']).to eq('Full name')
          end.to change { User.count }.by(1)
        end

        it 'sends invitation email' do
          expect do
            perform_enqueued_jobs do
              process :invite_new,
                      method: :post,
                      params: {
                        name: 'Full name',
                        email: 'email@test.com',
                        account_id: @account.id
                      }
            end
          end.to change { ActionMailer::Base.deliveries.count }.by(1)

          email = ActionMailer::Base.deliveries.last

          expect(email.subject).to eq('Ekto blog invite')
          expect(email.to).to eq(['email@test.com'])
        end
      end

      context 'errors' do
        it 'returns errors for user' do
          process :invite_new,
                  method: :post,
                  params: {
                    email: 'email@test.com',
                    account_id: @account.id
                  }

          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.body).to have_error("Name can't be blank")
        end

        it 'returns errors if account is not found' do
          process :invite_new,
                  method: :post,
                  params: {
                    email: 'email@test.com',
                    account_id: 0
                  }

          expect(response).to have_http_status(:not_found)
        end
      end
    end

    context 'account member but not owner' do
      include_context :with_authorized_user_and_account

      it 'returns unauthorized' do
        process :invite_new,
                method: :post,
                params: {
                  name: 'Full name',
                  email: 'email@test.com',
                  account_id: @account.id
                }

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'user not account member' do
      include_context :with_authorized_user

      it 'returns unauthorized' do
        account = create(:account)

        process :invite_new,
                method: :post,
                params: {
                  name: 'Full name',
                  email: 'email@test.com',
                  account_id: account.id
                }

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'unauthorized' do
      it 'returns unauthorized' do
        account = create(:account)

        process :invite_new,
                method: :post,
                params: {
                  name: 'Full name',
                  email: 'email@test.com',
                  account_id: account.id
                }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST #invite_existing' do
    context 'authenticated account owner' do
      include_context :with_authorized_account_owner

      context 'success' do
        it 'adds account access for an existing user' do
          user = create(:user)

          process :invite_existing,
                  method: :post,
                  params: { account_id: @account.id, user_id: user.id }

          result = JSON.parse(response.body)

          expect(response).to have_http_status(:ok)
          expect(result['data']['id']).to eq(user.id)
          expect(user.accounts).to include(@account)
        end
      end
    end
  end

  describe 'POST #remove' do
    context 'authenticated account owner' do
      include_context :with_authorized_account_owner

      context 'success' do
        it 'removes a users account access' do
          user = create(:user)
          enable_account_access(user.id, @account.id)

          expect do
            process :remove,
                    method: :post,
                    params: { account_id: @account.id, user_id: user.id }

            result = JSON.parse(response.body)

            expect(response).to have_http_status(:ok)
            expect(result['data']['id']).to eq(user.id)
          end.to change { AccountUser.count }.by(-1)
        end
      end

      context 'errors' do
        it 'returns error if user is not team member' do
          user = create(:user)

          process :remove,
                  method: :post,
                  params: { account_id: @account.id, user_id: user.id }

          expect(response).to have_http_status(:not_found)
        end

        it 'returns error if deleting account owner' do
          process :remove,
                  method: :post,
                  params: { account_id: @account.id, user_id: @user.id }

          expect(response).to have_http_status(:forbidden)
          expect(response.body).to have_error('Cannot remove account owner')
        end
      end
    end
  end
end
