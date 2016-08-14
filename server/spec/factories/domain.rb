FactoryGirl.define do
  factory :domain do
    host 'test.com'

    before(:create) do |obj|
      obj.account_id =
        FactoryGirl.create(:account).id unless obj.account_id.present?
    end
  end
end
