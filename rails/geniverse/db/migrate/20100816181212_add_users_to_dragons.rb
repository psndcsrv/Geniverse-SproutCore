class AddUsersToDragons < ActiveRecord::Migration
  def self.up
    add_column :dragons, :user_id, :integer
  end

  def self.down
    remove_column :dragons, :user_id
  end
end
