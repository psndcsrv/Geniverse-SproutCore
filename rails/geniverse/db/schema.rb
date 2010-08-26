# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100826183320) do

  create_table "activities", :force => true do |t|
    t.string   "initial_alleles"
    t.string   "base_channel_name"
    t.integer  "max_users_in_room"
    t.boolean  "send_bred_dragons"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
    t.string   "sc_type"
  end

  create_table "dragons", :force => true do |t|
    t.string   "name"
    t.integer  "sex"
    t.string   "alleles"
    t.string   "imageURL"
    t.integer  "mother_id"
    t.integer  "father_id"
    t.boolean  "bred"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "password_hash"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["username", "password_hash"], :name => "index_users_on_username_and_password_hash"

end
