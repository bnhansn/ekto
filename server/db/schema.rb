# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160927183600) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_users", force: :cascade do |t|
    t.integer  "account_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["account_id"], name: "index_account_users_on_account_id", using: :btree
    t.index ["deleted_at"], name: "index_account_users_on_deleted_at", using: :btree
    t.index ["user_id"], name: "index_account_users_on_user_id", using: :btree
  end

  create_table "accounts", force: :cascade do |t|
    t.string   "name"
    t.integer  "owner_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "slug"
    t.datetime "deleted_at"
    t.string   "key"
    t.text     "description",      default: ""
    t.string   "image"
    t.string   "meta_title",       default: ""
    t.string   "meta_description", default: ""
    t.index ["deleted_at"], name: "index_accounts_on_deleted_at", using: :btree
  end

  create_table "domains", force: :cascade do |t|
    t.integer  "account_id"
    t.string   "host"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_domains_on_account_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "account_id"
    t.string   "title",            default: ""
    t.text     "markdown",         default: ""
    t.text     "html",             default: ""
    t.string   "image"
    t.integer  "author_id"
    t.boolean  "featured",         default: false
    t.boolean  "published",        default: false
    t.datetime "published_at"
    t.integer  "created_by"
    t.integer  "updated_by"
    t.string   "slug"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.datetime "deleted_at"
    t.string   "meta_title",       default: ""
    t.text     "meta_description", default: ""
    t.index ["account_id"], name: "index_posts_on_account_id", using: :btree
    t.index ["deleted_at"], name: "index_posts_on_deleted_at", using: :btree
    t.index ["slug"], name: "index_posts_on_slug", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.datetime "deleted_at"
    t.boolean  "is_pending",             default: false
    t.index ["deleted_at"], name: "index_users_on_deleted_at", using: :btree
  end

end
