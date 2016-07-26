class AddSlugToAccounts < ActiveRecord::Migration[5.0]
  def change
    add_column :accounts, :slug, :string, index: true
    add_column :accounts, :slug_id, :integer
  end
end
