class ApplicationController < ActionController::API
  rescue_from Exception, with: :generic_error
  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

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
