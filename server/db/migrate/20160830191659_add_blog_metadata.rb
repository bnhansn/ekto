class AddBlogMetadata < ActiveRecord::Migration[5.0]
  def change
    add_column :accounts, :description, :text, default: ''
    add_column :accounts, :meta_title, :string, default: ''
    add_column :accounts, :meta_description, :text, default: ''
    add_column :posts, :meta_title, :string, default: ''
    add_column :posts, :meta_description, :text, default: ''
  end
end
