class AddIsPendingToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :is_pending, :boolean, default: false
  end
end
