class DevelopmentEmailInterceptor
  def self.delivering_email(message)
    message.subject = "#{message.to} #{message.subject}"
    message.to = 'bnhansn@gmail.com'
    message.cc = ''
  end
end
