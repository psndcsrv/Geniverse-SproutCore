class AddTypeToActivities < ActiveRecord::Migration
  def self.up
    add_column :activities, :sc_type, :string
  end

  def self.down
    remove_column :activities, :sc_type
  end
end
