require_relative '../../rails_helper'
require_relative '../../../lib/json_web_token'

describe JsonWebToken do
  it 'can encode and decode a payload' do
    user_id = 1

    token = JsonWebToken.encode(user_id: user_id)

    expect(token).to be_a(String)

    decoded_token = JsonWebToken.decode(token)

    expect(decoded_token[:user_id]).to eq(user_id)
  end

  it 'sets an expiration time as an integer' do
    token = JsonWebToken.encode({ user_id: 1 }, 1.week.from_now)

    decoded_token = JsonWebToken.decode(token)

    expect(decoded_token[:exp]).to be_a(Integer)
  end

  it 'returns nil when decoded_token has expired' do
    token = JsonWebToken.encode({ user_id: 1 }, 1.day.ago)

    decoded_token = JsonWebToken.decode(token)

    expect(decoded_token).to eq(nil)
  end
end
