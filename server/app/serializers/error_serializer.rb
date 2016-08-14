module ErrorSerializer
  def self.serialize(object)
    object.errors.messages.map do |field, errors|
      errors.map do |error_message|
        {
          message: "#{field.capitalize} #{error_message}"
        }
      end
    end.flatten
  end
end
