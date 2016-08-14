RSpec::Matchers.define :have_error do |message|
  match do |actual|
    parsed_actual = JSON.parse(actual)
    errors = parsed_actual['errors']
    return false if errors.empty?
    errors.any? do |error|
      error['message'].match(message)
    end
  end
end
