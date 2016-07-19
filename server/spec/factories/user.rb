FactoryGirl.define do
  factory :user do
    first_name 'First'
    last_name 'Last'
    password 'password'
    sequence(:email) { |n| "email#{n}@test.com" }
  end
end
