class ChangeDomainUrlToHost < ActiveRecord::Migration[5.0]
  def change
    rename_column :domains, :url, :host
  end
end
