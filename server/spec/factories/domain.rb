FactoryGirl.define do
  factory :domain do
    url 'http://test.com'

    before(:create) do |obj|
      obj.account_id =
        FactoryGirl.create(:account).id unless obj.account_id.present?
    end
  end
end
