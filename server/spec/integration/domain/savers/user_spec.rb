require_relative '../../../rails_helper'

describe Savers::User do
  describe '#create_for_signup' do
    context 'success' do
      it 'creates a user' do
        attrs = {
          name: 'Full name',
          email: 'email@test.com',
          password: 'password'
        }
        params = ActionController::Parameters.new(attrs)

        expect do
          result = Savers::User.create_for_signup(params)

          expect(result.name).to eq('Full name')
          expect(result.email).to eq('email@test.com')
        end.to change { ::User.count }.from(0).to(1)
      end
    end

    context 'errors' do
      it 'returns errors' do
        attrs = { name: '' }
        params = ActionController::Parameters.new(attrs)

        expect do
          result = Savers::User.create_for_signup(params)

          expect(result.errors.full_messages).to include(/Name can't be blank/)
        end.not_to change { ::User.count }
      end

      it 'returns error if email is taken' do
        _existing_user = create(:user, email: 'email@test.com')
        attrs = { name: 'Full name', email: 'email@test.com' }
        params = ActionController::Parameters.new(attrs)

        expect do
          result = Savers::User.create_for_signup(params)

          expect(result.errors.full_messages).to include('Email has already' \
          ' been taken')
        end.not_to change { ::User.count }
      end
    end

    context 'invited user' do
      it 'finds an updates an invited user' do
        invited_user = create(:user, is_pending: true)

        attrs = {
          name: 'Updated name',
          email: invited_user.email,
          password: 'newpassword'
        }
        params = ActionController::Parameters.new(attrs)

        result = Savers::User.create_for_signup(params)

        expect(result.id).to eq(invited_user.id)
        expect(result.name).to eq('Updated name')
        expect(result.email).to eq(invited_user.email)
        expect(result.password).to eq('newpassword')
      end
    end
  end

  describe '#update' do
    before do
      @user = create(:user)
      attrs = { name: 'Updated user name' }
      @params = ActionController::Parameters.new(attrs)
    end

    context 'success' do
      it 'works' do
        user = Savers::User.update(@user, @params)

        expect(user.name).to eq('Updated user name')
      end
    end

    context 'errors' do
      it 'returns errors' do
        @params[:name] = ''

        user = Savers::User.update(@user, @params)

        expect(user.errors.full_messages).to include(/Name can't be blank/)
      end
    end
  end

  describe '#create_from_invitation' do
    context 'success' do
      before do
        @account = create(:account)
        attrs = {
          name: 'Full name',
          email: 'email@test.com',
          account_id: @account.id
        }
        @params = ActionController::Parameters.new(attrs)
      end

      it 'creates a user' do
        expect do
          user, _errors = Savers::User.create_from_invitation(@params)

          expect(user.name).to eq('Full name')
        end.to change { User.count }.by(1)
      end

      it 'gives account access to user' do
        user, _errors = Savers::User.create_from_invitation(@params)

        expect(user.accounts.map(&:id)).to include(@account.id)
      end
    end

    context 'errors' do
      it 'returns user errors' do
        account = create(:account)
        attrs = { account_id: account.id }
        params = ActionController::Parameters.new(attrs)

        _user, errors = Savers::User.create_from_invitation(params)

        expect(errors).to include("Name can't be blank")
      end

      it 'returns errors if account access is not given' do
        attrs = { name: 'Full name', email: 'email@test.com' }
        params = ActionController::Parameters.new(attrs)

        _user, errors = Savers::User.create_from_invitation(params)

        expect(errors).to include('Could not assign user to account')
      end
    end
  end
end
