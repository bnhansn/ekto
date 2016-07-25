require_relative '../../../rails_helper'

describe Factories::User do
  describe '#build' do
    it 'works' do
      attrs = {
        data: {
          attributes: {
            name: 'Full name',
            email: 'email@test.com',
            password: 'password'
          }
        }
      }
      params = ActionController::Parameters.new(attrs)

      user = Factories::User.build(params)

      expect(user.name).to eq('Full name')
      expect(user.email).to eq('email@test.com')
      expect(user.password).to eq('password')
    end
  end
end
