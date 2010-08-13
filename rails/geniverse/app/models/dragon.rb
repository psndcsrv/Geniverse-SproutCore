class Dragon < ActiveRecord::Base
  has_many :children, :class_name => "Dragon", :finder_sql => 'SELECT * FROM dragons WHERE mother_id = #{id} OR father_id = #{id}'
  
  belongs_to :father, :class_name => "Dragon"
  belongs_to :mother, :class_name => "Dragon"
end
