class PasswordMailer < ApplicationMailer
  def password_reset(user)
    @user = user
    mail(to: "#{@user.name} <#{@user.email}>", subject: 'Password reset')
  end
end
