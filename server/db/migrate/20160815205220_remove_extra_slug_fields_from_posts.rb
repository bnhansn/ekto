class RemoveExtraSlugFieldsFromPosts < ActiveRecord::Migration[5.0]
  def change
    remove_column :posts, :slug_id
    remove_column :posts, :slug_candidate
  end
end
