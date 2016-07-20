FactoryGirl.define do
  factory :post do
    title 'Post title'
    sequence(:slug) { |n| "post-title-#{n}" }

    before(:create) do |obj|
      obj.account_id =
        FactoryGirl.create(:account).id unless obj.account_id.present?
    end
  end
end
