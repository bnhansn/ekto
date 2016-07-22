class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.references :account
      t.string :title
      t.text :markdown
      t.text :html
      t.string :image
      t.integer :author_id
      t.boolean :featured, default: false
      t.boolean :published, default: false
      t.integer :published_by
      t.datetime :published_at
      t.integer :created_by
      t.integer :updated_by
      t.string :slug, index: true
      t.string :slug_candidate
      t.integer :slug_id
      t.timestamps
    end
  end
end
