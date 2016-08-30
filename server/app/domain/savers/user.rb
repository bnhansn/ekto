module Savers
  module User
    module_function

    def create_for_signup(params)
      invited_user =
        ::User.where(is_pending: true).find_by_email(params[:email])
      user = if invited_user
               Factories::User.update_invited_user(invited_user, params)
             else
               Factories::User.build_for_signup(params)
             end
      user.save
      user
    end

    def update(user, params)
      user = Factories::User.assign(user, params)
      user.save
      user
    end

    # rubocop:disable LineLength, RedundantReturn
    def create_from_invitation(params)
      user = Factories::User.build_from_invitation(params)
      ActiveRecord::Base.transaction do
        user.save
        return user, user.errors.full_messages if user.errors.any?
        au = AccountUser.create(user_id: user.id, account_id: params[:account_id])
        return user, ['Could not assign user to account'] unless au.persisted?
      end
      return user, []
    end
  end
end
