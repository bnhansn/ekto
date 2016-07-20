shared_context :with_authorized_user do
  before(:each) do
    @user = create(:user)
    token = JsonWebToken.encode(user_id: @user.id)
    request.headers['Authorization'] = "Bearer #{token}"
  end
end

shared_context :with_authorized_user_and_account do
  before(:each) do
    @user = create(:user)
    token = JsonWebToken.encode(user_id: @user.id)
    @account = create(:account)
    enable_account_access(@user.id, @account.id)
    request.headers['Authorization'] = "Bearer #{token}"
  end
end

def enable_account_access(user_id, account_id)
  AccountUser.create(user_id: user_id, account_id: account_id)
end
