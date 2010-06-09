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
App.define 'topBar', 'mainChatExamplePage.mainPane.topBar', View


describe "App Controller Test" do
  

  before(:all) do    
    @login_field = App['appContainer.loginView.inputView.textFieldView', 'SC.TextFieldView']
    @login_button = App['appContainer.loginView.loginButtonView', 'SC.ButtonView']
    @welcome_label = App['topBar.welcomeLabelView', 'SC.LabelView']
    @logout_button = App['topBar.logoutButton', 'SC.ButtonView']
  end
  
  it "will show the welcome message after login" do
    @welcome_label.should have_value ""
    @welcome_label.should_not be_visible_in_window
    @login_field.type "Test"
    @login_button.click
    @welcome_label.should have_value "Welcome Test"
    @welcome_label.should be_visible_in_window
  end
  
  it "will show the login field after logout" do
    @login_field.should_not be_visible_in_window
    @logout_button.should be_visible_in_window
    @logout_button.click
    # @login_field.should be_visible_in_window
    # @logout_button.should_not be_visible_in_window
  end
  
end

# describe "Article test" do
#   
# 
#   before(:all) do    
#     @login_field = App['appContainer.loginView.inputView.textFieldView', 'SC.TextFieldView']
#     @login_button = App['appContainer.loginView.loginButtonView', ButtonView]
#     @welcome_label = App['appContainer.loginView.welcomeView', 'SC.LabelView'] # Using the view's layer ID 
#   end
#   
#   it "will show the welcome message after login" do
#     @welcome_label.should have_value ""
#     @login_field.type "Test"
#     @login_button.click
#     @welcome_label.should have_value "Welcome Test"
#   end
#   
# end