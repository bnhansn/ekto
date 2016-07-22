FactoryGirl.define do
  factory :user do
    name 'Full name'
    password 'password'
    sequence(:email) { |n| "email#{n}@test.com" }
  end
end
