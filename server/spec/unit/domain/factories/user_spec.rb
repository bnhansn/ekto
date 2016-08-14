require_relative '../../../rails_helper'

describe Factories::User do
  describe '#build' do
    it 'works' do
      attrs = {
        name: 'Full name',
        email: 'email@test.com',
        password: 'password'
      }
      params = ActionController::Parameters.new(attrs)

      user = Factories::User.build(params)

      expect(user.name).to eq('Full name')
      expect(user.email).to eq('email@test.com')
      expect(user.password).to eq('password')
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
end
