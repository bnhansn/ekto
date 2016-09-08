class AddDefaultsToPosts < ActiveRecord::Migration[5.0]
  def change
    change_column :posts, :title, :string, default: ''
    change_column :posts, :markdown, :text, default: ''
    change_column :posts, :html, :text, default: ''
  end
end
