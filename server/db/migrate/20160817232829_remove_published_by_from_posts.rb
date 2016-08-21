class RemovePublishedByFromPosts < ActiveRecord::Migration[5.0]
  def change
    remove_column :posts, :published_by
  end
end
