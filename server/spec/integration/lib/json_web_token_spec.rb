require 'rails_helper'
require 'json_web_token'

describe JsonWebToken do
  it 'can encode and decode a user_id and expiration time' do
    expiration = 30.minutes.from_now.to_i
    user_id = 1

    token = JsonWebToken.encode(user_id: user_id, exp: expiration)

    expect(token).to be_a(String)

    decoded_token = JsonWebToken.decode(token)

    expect(decoded_token[:user_id]).to eq(user_id)
    expect(decoded_token[:exp]).to eq(expiration)
  end
end
