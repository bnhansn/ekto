FactoryGirl.define do
  factory :account do
    name 'Account name'
    sequence(:key) { |n| "key_#{n}" }
  end
end
