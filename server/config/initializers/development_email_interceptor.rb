if Rails.env.development?
  ActionMailer::Base.register_interceptor(DevelopmentEmailInterceptor)
end
