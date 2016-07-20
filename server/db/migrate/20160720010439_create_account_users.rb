class CreateAccountUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :account_users do |t|
      t.references :account
      t.references :user
      t.timestamps
    end
  end
end
