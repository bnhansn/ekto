require_relative '../../../rails_helper'

describe Savers::User do
  describe '#create' do
    context 'success' do
      it 'creates a user' do
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

        expect do
          result = Savers::User.create(params)

          expect(result.name).to eq('Full name')
          expect(result.email).to eq('email@test.com')
        end.to change { ::User.count }.from(0).to(1)
      end
    end

    context 'errors' do
      it 'returns errors' do
        attrs = { data: { attributes: { name: '' } } }
        params = ActionController::Parameters.new(attrs)

        expect do
          result = Savers::User.create(params)

          expect(result.errors.full_messages).to include(/Name can't be blank/)
        end.not_to change { ::User.count }
      end
    end
  end
end
