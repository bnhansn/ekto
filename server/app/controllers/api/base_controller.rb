class Api::BaseController < ApplicationController
  require 'json_web_token'
  before_action :authenticate_user

  rescue_from Exception, with: :generic_error
  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def render_user_and_token(user, status = :ok)
    token = JsonWebToken.encode(user_id: user.id)
    render json: user, meta: { token: token }, status: status
  end

  def render_errors(resource, status = :unprocessable_entity)
    errors = []
    resource.errors.full_messages.each do |error|
      errors << { title: error }
    end
    render json: { errors: errors }, status: status
  end

  private

  def authenticate_user
    @user = User.find(decoded_token[:user_id]) if decoded_token
    render json: {
      errors: [{ title: 'Unauthorized' }]
    }, status: :unauthorized unless @user
  end

  def decoded_token
    if request.headers['Authorization'].present?
      token = request.headers['Authorization'].split(' ').last
      JsonWebToken.decode(token)
    end
  end

  def generic_error(error)
    render json: {
      errors: [{ title: error.message.capitalize }]
    }, status: :internal_server_error
  end

  def invalid_record(error)
    render json: {
      errors: [{ title: error.message.capitalize }]
    }, status: :unprocessable_entity
  end

  def record_not_found(error)
    render json: {
      errors: [{ title: error.message.capitalize }]
    }, status: :not_found
  end
end
