class AddKeyToAccounts < ActiveRecord::Migration[5.0]
  def change
    add_column :accounts, :key, :string

    Account.all.each do |account|
      account.key = SecureRandom.hex.first(10)
      account.save
    end
  end
end
