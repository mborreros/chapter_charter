# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_15_160811) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.string "title"
    t.string "author"
    t.integer "length"
    t.string "cover_img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "book_api_num"
    t.string "genre", array: true
  end

  create_table "challenge_entries", force: :cascade do |t|
    t.integer "challenge_id"
    t.integer "book_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "journey_entry_id"
  end

  create_table "challenges", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.date "start_date"
    t.date "end_date"
    t.integer "user_id"
    t.integer "goal_number"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "goal_type"
    t.string "category_identifier"
    t.boolean "successful"
    t.boolean "active"
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
    t.boolean "challenge_locked", default: false
  end

  create_table "journey_entries", force: :cascade do |t|
    t.integer "journey_id"
    t.date "date"
    t.integer "progress"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "journeys", force: :cascade do |t|
    t.integer "book_id"
    t.integer "user_id"
    t.date "start_date"
    t.date "end_date"
    t.boolean "completed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "manually_completed"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "screenname"
    t.string "avatar_img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
