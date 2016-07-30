require_relative '../../rails_helper'

RSpec.describe User, type: :model do
  it_behaves_like 'a paranoid model'
end
