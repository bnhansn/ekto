module ErrorSerializer
  def self.serialize(object)
    object.errors.messages.map do |field, errors|
      errors.map do |error_message|
        {
          source: { pointer: "/data/attributes/#{field}" },
          detail: error_message,
          title: "#{field.capitalize} #{error_message}"
        }
      end
    end.flatten
  end
end
