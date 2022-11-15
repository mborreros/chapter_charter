ActiveRecord::Schema[7.0].define(version: 2022_11_15_203000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.string "title"
    t.string "author"
    t.integer "length"
    t.string "genre"
    t.string "cover_img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "collection_entries", force: :cascade do |t|
    t.integer "collection_id"
    t.integer "book_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "collections", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.string "screenname"
    t.string "avatar_img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
