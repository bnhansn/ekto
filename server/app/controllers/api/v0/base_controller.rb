class Api::V0::BaseController < ApplicationController
  require 'json_web_token'
  before_action :authenticate_user

  def render_user_and_token(user, status = :ok)
    token = JsonWebToken.encode({ user_id: user.id }, 1.week.from_now)
    render json: user, meta: { token: token }, status: status
  end

  def render_errors(resource)
    render json: {
      errors: ResourceErrorSerializer.serialize(resource)
    }, status: :unprocessable_entity
  end

  def render_error_messages(resource, status = :unprocessable_entity)
    render json: {
      errors: ErrorMessageSerializer.serialize(resource)
    }, status: status
  end

  def render_error_message(message, status = :internal_server_error)
    render json: {
      errors: [{ message: message }]
    }, status: status
  end

  def unauthorized_error
    render json: {
      errors: [{ message: 'Unauthorized' }]
    }, status: :unauthorized
  end

  private

  def authenticate_user
    @user = User.find(decoded_token[:user_id]) if decoded_token
    return unauthorized_error unless @user
  end

  def decoded_token
    if request.headers['Authorization'].present?
      token = request.headers['Authorization'].split(' ').last
      JsonWebToken.decode(token)
    end
  end
end
