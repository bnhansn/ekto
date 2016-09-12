require_relative '../../../rails_helper'
include ActiveJob::TestHelper

describe Services::PasswordReset do
  before do
    @user = create(:user)
  end

  describe '#send_reset' do
    context 'success' do
      it 'works' do
        expect do
          result = Services::PasswordReset.send_reset(@user)
          expect(result).to eq(true)
        end.not_to raise_error
      end

      it 'sends a password reset email' do
        expect do
          perform_enqueued_jobs do
            Services::PasswordReset.send_reset(@user)
          end
        end.to change { ActionMailer::Base.deliveries.count }.from(0).to(1)
      end

      it 'sets users password_reset_sent_at to current time' do
        now = Time.zone.now
        Timecop.freeze(now)

        Services::PasswordReset.send_reset(@user)

        expect(@user.password_reset_sent_at).to eq(now)
      end

      it 'generates a new password_reset_token' do
        @user.password_reset_token = 'old_token'
        @user.save
        old_token = @user.password_reset_token

        Services::PasswordReset.send_reset(@user)

        expect(@user.password_reset_token).not_to eq(old_token)
      end

      it 'saves token as a minimum 22 character random url safe string' do
        Services::PasswordReset.send_reset(@user)

        expect(@user.password_reset_token).to match(/^[a-zA-Z0-9_\-]{22,}/)
      end
    end

    context 'errors' do
      it 'returns false if no user' do
        result = Services::PasswordReset.send_reset(nil)

        expect(result).to eq(false)
      end
    end
  end

  describe '#update_password' do
    context 'success' do
      it 'works' do
        expect do
          Services::PasswordReset.update_password(@user, 'new password')
        end.not_to raise_error
      end

      it 'updates password' do
        old_password = @user.password_digest

        result = Services::PasswordReset.update_password(@user, 'new password')

        expect(result.password_digest).not_to eq(old_password)
      end
    end

    context 'errors' do
      it 'returns error if user is not found' do
        _user, error, status =
          Services::PasswordReset.update_password(nil, 'password')

        expect(error).to eq('User not found')
        expect(status).to eq(:not_found)
      end

      it 'returns error if token has expired' do
        @user.password_reset_sent_at = 1.week.ago
        @user.password_reset_token = 'token'
        @user.save
        _user, error, status =
          Services::PasswordReset.update_password(@user, 'password')

        expect(error).to eq('Password reset token has expired')
        expect(status).to eq(:forbidden)
      end

      it 'returns error if new password is invalid' do
        _user, error, status =
          Services::PasswordReset.update_password(@user, 'x')

        expect(status).to eq(:unprocessable_entity)
        expect(error).to match(/Password is too short/)
      end
    end
  end
end
