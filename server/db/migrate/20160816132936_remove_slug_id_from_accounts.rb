class RemoveSlugIdFromAccounts < ActiveRecord::Migration[5.0]
  def change
    remove_column :accounts, :slug_id
  end
end
