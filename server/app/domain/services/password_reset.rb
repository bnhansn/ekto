module Services
  module PasswordReset
    module_function

    def send_reset(user)
      if user
        generate_token(user)
        user.password_reset_sent_at = Time.zone.now
        user.save
        PasswordMailer.password_reset(user).deliver_later
        true
      else
        false
      end
    end

    def generate_token(user)
      loop do
        user.password_reset_token = SecureRandom.urlsafe_base64
        break unless User.exists?(
          password_reset_token: user.password_reset_token
        )
      end
    end

    def update_password(user, password)
      return false, 'User not found', :not_found unless user
      if user.password_reset_sent_at &&
         user.password_reset_sent_at < 6.hours.ago
        return false, 'Password reset token has expired', :forbidden
      end

      user.password = password
      user.save

      if user.errors.any?
        return false, user.errors.full_messages[0], :unprocessable_entity
      end
      user
    end
  end
end
