require_relative '../../../rails_helper'

describe Factories::User do
  describe '#build_for_signup' do
    it 'works' do
      attrs = {
        name: 'Full name',
        email: 'email@test.com',
        password: 'password'
      }
      params = ActionController::Parameters.new(attrs)

      user = Factories::User.build_for_signup(params)

      expect(user.name).to eq('Full name')
      expect(user.email).to eq('email@test.com')
      expect(user.password).to eq('password')
    end
  end

  describe '#update_invited_user' do
    it 'update a user' do
      user = create(:user)
      attrs = { name: 'Updated name', password: 'newpassword' }
      params = ActionController::Parameters.new(attrs)

      user = Factories::User.update_invited_user(user, params)

      expect(user.name).to eq('Updated name')
      expect(user.password).to eq('newpassword')
    end

    it 'changes is_pending to false' do
      user = create(:user)
      params = ActionController::Parameters.new({})

      user = Factories::User.update_invited_user(user, params)

      expect(user.is_pending).to eq(false)
    end
  end

  describe '#assign' do
    it 'works' do
      user = create(:user)
      attrs = { name: 'Updated name' }
      params = ActionController::Parameters.new(attrs)

      user = Factories::User.assign(user, params)

      expect(user.name).to eq('Updated name')
    end
  end

  describe '#build_from_invitation' do
    it 'works for passthrough fields' do
      attrs = { name: 'Full name', email: 'email@test.com' }
      params = ActionController::Parameters.new(attrs)

      user = Factories::User.build_from_invitation(params)

      expect(user.name).to eq('Full name')
      expect(user.email).to eq('email@test.com')
    end

    it 'creates a temporary password' do
      params = ActionController::Parameters.new({})

      user = Factories::User.build_from_invitation(params)

      expect(user.password.length).to be > 0
    end

    it 'sets is_pending to true' do
      params = ActionController::Parameters.new({})

      user = Factories::User.build_from_invitation(params)

      expect(user.is_pending).to eq(true)
    end
  end
end
