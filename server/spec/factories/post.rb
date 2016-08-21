FactoryGirl.define do
  factory :post do
    title 'Untitled'
    sequence(:slug) { |n| "slug_#{n}" }

    before(:create) do |post|
      post.account_id =
        FactoryGirl.create(:account).id unless post.account_id.present?
    end
  end
end
