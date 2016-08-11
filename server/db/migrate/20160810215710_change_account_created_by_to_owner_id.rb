class ChangeAccountCreatedByToOwnerId < ActiveRecord::Migration[5.0]
  def change
    rename_column :accounts, :created_by, :owner_id
  end
end
