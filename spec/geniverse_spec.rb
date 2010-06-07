# ==========================================================================
# Project:   Lebowski Framework - The SproutCore Test Automation Framework
# License:   Licensed under MIT license (see License.txt)
# ==========================================================================

# require '../../../lib/lebowski/spec'
# 
# include Lebowski::Foundation
# include Lebowski::Foundation::Views


App = Application.new \
        :app_root_path => "/geniverse", 
        :app_name => "Geniverse",
        :browser => :firefox # optional parameter. Firefox is the default browser


App.start do |app|
  app['isLoaded'] == true
end


App.window.move_to 1, 1 # Have a slight offset for Firefox so that the window will actually be moved
App.window.resize_to 1024, 768 


App.define 'appContainer', 'mainChatExamplePage.mainPane.appContainer', View


describe "Geniverse Test" do
  

  before(:all) do    
    @login_field = App['appContainer.loginView.inputView.textFieldView', 'SC.TextFieldView']
    @login_button = App['appContainer.loginView.loginButtonView', ButtonView]
    @welcome_label = App['appContainer.loginView.welcomeView', 'SC.LabelView'] # Using the view's layer ID 
  end
  
  it "will show the welcome message after login" do
    @welcome_label.should have_value ""
    @login_field.type "Test"
    @login_button.click
    @welcome_label.should have_value "Welcome Test"
  end
  
end