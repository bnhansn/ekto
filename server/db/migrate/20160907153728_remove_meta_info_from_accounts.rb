class RemoveMetaInfoFromAccounts < ActiveRecord::Migration[5.0]
  def change
    remove_column :accounts, :meta_title
    remove_column :accounts, :meta_description
  end
end
