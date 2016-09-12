config_file = File.join(Rails.root, 'config', 'redis.yml')
redis_config = YAML.load_file(config_file)
redis_config.merge!(redis_config.fetch(Rails.env, {}))
redis_config.symbolize_keys!

Sidekiq.configure_server do |config|
  config.redis = {
    url: "redis://#{redis_config[:host]}:#{redis_config[:port]}/12"
  }
end

Sidekiq.configure_client do |config|
  config.redis = {
    url: "redis://#{redis_config[:host]}:#{redis_config[:port]}/12"
  }
end
