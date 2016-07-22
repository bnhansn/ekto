FactoryGirl.define do
  factory :post do
    title 'Untitled'

    before(:create) do |obj|
      obj.account_id =
        FactoryGirl.create(:account).id unless obj.account_id.present?
    end
  end
end
