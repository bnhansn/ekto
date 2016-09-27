class RemoveDomains < ActiveRecord::Migration[5.0]
  def change
    drop_table :domains
  end
end
