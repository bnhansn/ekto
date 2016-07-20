class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :slug, index: true
      t.text :markdown
      t.text :html
      t.string :image
      t.integer :author_id
      t.string :uuid
      t.boolean :featured, default: false
      t.boolean :published, default: false
      t.integer :published_by
      t.datetime :published_at
      t.references :account
      t.integer :created_by
      t.integer :updated_by
      t.timestamps
    end
  end
end
