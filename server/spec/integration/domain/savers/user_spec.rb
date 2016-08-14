require_relative '../../../rails_helper'

describe Savers::User do
  describe '#create' do
    context 'success' do
      it 'creates a user' do
        attrs = {
          name: 'Full name',
          email: 'email@test.com',
          password: 'password'
        }
        params = ActionController::Parameters.new(attrs)

        expect do
          result = Savers::User.create(params)

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
          result = Savers::User.create(params)

          expect(result.errors.full_messages).to include(/Name can't be blank/)
        end.not_to change { ::User.count }
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
end
