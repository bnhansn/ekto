require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
# require 'action_cable/engine'
# require 'sprockets/railtie'
require 'rails/test_unit/railtie'

Bundler.require(*Rails.groups)

Dotenv.load unless Rails.env == 'production'

module Billow
  class Application < Rails::Application
    config.api_only = true
    config.autoload_paths += %W(#{config.root}/lib)
    config.generators.test_framework = false
  end
end
