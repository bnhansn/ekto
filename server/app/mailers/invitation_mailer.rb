class InvitationMailer < ApplicationMailer
  def new_user_invitation(user, account)
    @user = user
    @account = account
    mail(to: "#{@user.name} <#{@user.email}>", subject: 'Ekto blog invite')
  end
end
