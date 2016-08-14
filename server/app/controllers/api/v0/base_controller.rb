class Api::V0::BaseController < ApplicationController
  require 'json_web_token'
  before_action :authenticate_user

  rescue_from Exception, with: :generic_error
  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def render_user_and_token(user, status = :ok)
    token = JsonWebToken.encode({ user_id: user.id }, 1.week.from_now)
    render json: user, meta: { token: token }, status: status
  end

  def render_errors(resource)
    render json: {
      errors: ErrorSerializer.serialize(resource)
    }, status: :unprocessable_entity
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

  def generic_error(error)
    render json: {
      errors: [{ message: error.message.capitalize }]
    }, status: :internal_server_error
  end

  def record_not_found(error)
    render json: {
      errors: [{ message: error.message.capitalize }]
    }, status: :not_found
  end

  def parameter_missing(error)
    render json: {
      errors: [{ message: error.message.capitalize }]
    }, status: :bad_request
  end
end
