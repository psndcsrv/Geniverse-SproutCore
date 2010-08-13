class Activity < ActiveRecord::Base
  def json_attributes
    attrs = attributes
    
    attrs.delete('id')
    attrs.delete('created_at')
    attrs.delete('updated_at')

    return attrs
  end
end
