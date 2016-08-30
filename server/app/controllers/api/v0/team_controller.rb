class Api::V0::TeamController < Api::V0::BaseController
  def invite_new
    account = Account.friendly.find(params[:account_id])
    return unauthorized_error unless account.owner_id == @user.id

    user, errors = Savers::User.create_from_invitation(params)
    if errors.empty?
      InvitationMailer.new_user_invitation(user, account).deliver_now
      render json: user, status: :created
    else
      render_error_messages(errors)
    end
  end

  def invite_existing
    account = Account.friendly.find(params[:account_id])
    return unauthorized_error unless account.owner_id == @user.id

    user = User.find(params[:user_id])
    if AccountUser.create(user_id: user.id, account_id: account.id)
      render json: user, status: :ok
    else
      render json: {
        errors: [{ message: 'User could not be added to account' }]
      }, status: :unprocessable_entity
    end
  end

  def remove
    account = Account.friendly.find(params[:account_id])
    return unauthorized_error unless account.owner_id == @user.id

    user = account.users.find(params[:user_id])
    if user.id == account.owner_id
      return render_error_message('Cannot remove account owner', :forbidden)
    end

    au = AccountUser.where(account: account, user: user).first
    return render json: { data: { id: user.id } }, status: :ok if au.destroy
    render_error_message('Could not remove user')
  end
end
