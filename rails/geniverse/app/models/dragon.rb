class Dragon < ActiveRecord::Base
  has_many :children, :class_name => "Dragon", :finder_sql => 'SELECT * FROM dragons WHERE mother_id = #{id} OR father_id = #{id}'
  
  belongs_to :father, :class_name => "Dragon"
  belongs_to :mother, :class_name => "Dragon"
  
  def json_attributes
    attrs = attributes
    
    attrs.delete('id')
    attrs.delete('created_at')
    attrs.delete('updated_at')
    
    attrs['mother'] = attrs['mother_id']
    attrs['father'] = attrs['father_id']
    attrs.delete('mother_id')
    attrs.delete('father_id')
    return attrs
  end
  belongs_to :user
end
