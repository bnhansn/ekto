module ErrorMessageSerializer
  def self.serialize(errors)
    errors.map do |error_message|
      {
        message: error_message
      }
    end
  end
end
