class JsonWebToken
  def self.encode(payload, expiration = 1.week.from_now)
    payload[:exp] = expiration.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def self.decode(token)
    decoded_token =
      JWT.decode(token, Rails.application.secrets.secret_key_base).first
    HashWithIndifferentAccess.new(decoded_token)
  rescue
    nil
  end
end
