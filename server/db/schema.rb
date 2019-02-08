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

ActiveRecord::Schema.define(version: 2019_02_05_125334) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bots", force: :cascade do |t|
    t.integer "user_id"
    t.string "coin"
    t.float "percentage"
    t.float "middle_point"
    t.float "ratio"
    t.boolean "selling_mode", default: true
    t.float "gained_amount"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.integer "user_id"
    t.string "coin"
    t.float "amount"
    t.float "price_per_unit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "news", force: :cascade do |t|
    t.string "title"
    t.string "content"
    t.string "description"
    t.string "url"
    t.string "urlToImage"
    t.string "publishedAt"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string "content"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.string "email"
    t.string "last_access"
    t.string "created"
    t.string "api_key"
    t.string "api_secret"
    t.string "total", default: [["Day", "Total", "Break-even-point"]], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
