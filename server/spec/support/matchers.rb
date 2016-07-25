RSpec::Matchers.define :have_error do |title|
  match do |actual|
    parsed_actual = JSON.parse(actual)
    errors = parsed_actual['errors']
    return false if errors.empty?
    errors.any? do |error|
      error['title'].match(title)
    end
  end
end
