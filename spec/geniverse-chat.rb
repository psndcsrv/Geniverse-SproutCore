# ==========================================================================
# Project:   Lebowski Framework - The SproutCore Test Automation Framework
# License:   Licensed under MIT license (see License.txt)
# ==========================================================================

# require '../../../lib/lebowski/spec'
# 
# include Lebowski::Foundation
# include Lebowski::Foundation::Views

# you can uncomment this to drive a remote client on saucelabs
# client = Selenium::Client::Driver.new \
#         :host => 'saucelabs.com',
#         :port => 4444, 
#         :browser => '{"username": "scytacki",' +
#           # put a valid access-key in here:
#                       '"access-key": "b19adfe1-37e5-4277-a90b-d2f29cd69440",' +
#                       '"os": "Windows 2003",' +
#                       '"browser": "safari",' +
#                       '"browser-version": "4.",' +
#                       '"job-name": "Lebowski Test",' +
#                       '"max-duration": 60,' +
#                       '"user-extensions-url": "http://www.concord.org/~sfentress/lebowski/user-extensions.js"}',
#         :url => "http://geniverse.dev.concord.org/sproutcore/", 
#         :timeout_in_seconds => 90

# or you can use this to use your own browser
client = Selenium::Client::Driver.new \
        :host => 'localhost',
        :port => 4444, 
        :browser => :firefox,
        :url => "http://geniverse.dev.concord.org/sproutcore/", 
        :timeout_in_seconds => 90
        
        

App = Application.new \
        :app_root_path => "/geniverse-chat", 
        :app_name => "Geniverse",
        :driver => client


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
 
    @chat_field = App['appContainer.mainAppView.chatView.chatComposeView.chatComposeView.inputView.textFieldView', 'SC.TextFieldView']
    @chat_button = App['appContainer.mainAppView.chatView.chatComposeView.chatComposeView.sendView', 'SC.ButtonView']
    @chat_list = App['appContainer.mainAppView.chatView.chatListView.contentView', 'SC.StackedView']
  end
  
  after(:all) do
    App.end
  end
  
  it "will show the welcome message after login" do
    @welcome_label.should have_value ""
    
    ## FIXME: These don't work on the deployed geniverse application...
    # @welcome_label.should_not be_visible_in_window
    # @welcome_label.should have_text_align 'right' # check that we can test for arbitrary SC properties
    
    @login_field.type "Test"
    @login_button.click
    @welcome_label.should have_value /^Welcome Test.*/
    @welcome_label.should be_visible_in_window
  end
  
  it "will chat 1000 messages" do
    
    for i in (1..1000)
      @chat_field.type "Test message "+i.to_s
      @chat_button.click
    end
    
    # @chat_list.content.last['message'].should == "Test message 2"
    
    
    
  end
  
end