class AddMetaInfoBackToAccounts < ActiveRecord::Migration[5.0]
  def change
    add_column :accounts, :meta_title, :string, default: ''
    add_column :accounts, :meta_description, :string, default: ''
  end
end
