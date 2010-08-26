#!/usr/bin/env ruby

require 'rubygems'
require 'selenium-webdriver'
require 'open-uri'

ERROR_THRESHOLD = 3

# SERVER_IP = '63.138.119.217' # otto
SERVER_IP = '127.0.0.1'

if ! File.exists?("text.txt")
  puts "Getting something interesting to talk about..."
  File.open("text.txt", "w") {|f| f.write(open("http://www.gutenberg.org/files/132/132.txt").read); f.flush }
end
puts "Loading in interesting chat topic..."
TEXT = open("text.txt").read.sub(/.*?Ssu-ma Ch`ien gives the following biography of Sun Tzu:  \[1\]/m, '')

class Chatter
  @@messages = TEXT.scan(/.*?[\.\?\!]/m)
  @@currentMessage = 0
  
  def init(browser, left = true)
    @errors = []
    @browser = browser
    puts "Setting up #{@browser}"
    @driver = Selenium::WebDriver.for(:remote,
      :url => "http://#{SERVER_IP}:4444/wd/hub",
      :desired_capabilities => Selenium::WebDriver::Remote::Capabilities.send(@browser.to_sym)
    )
    
    @driver.navigate.to "http://geniverse.dev.concord.org/sproutcore/gentest"
    # maximize the window
    @driver.execute_script("window.moveTo(0, 0); if (window.screen) { window.moveTo(" + (left ? "0" : "window.screen.availWidth/2") + ", 0); window.resizeTo(window.screen.availWidth/2, window.screen.availHeight); } else { window.resizeTo('1024','768'); }; return true")
  end
  
  def quit
    puts "Quitting browser"
    @driver.quit
  end

  def login(id)
    logout
    @username = "testuser-#{id}"
    puts "Logging in on #{@browser} as: #{@username}"
    user_field = nil
    wrap { user_field = @driver.find_element(:xpath, "//*[@id='chatLogin']//input") }
    wrap { user_field.send_keys(@username) }
  
    login_button = nil
    wrap { login_button = @driver.find_element(:xpath, "//*[@id='chatLogin']//*[@role='button']") }
    wrap { login_button.click }
  end
  
  def logout
    
    begin
      logout_button = nil
      wrap { logout_button = @driver.find_element(:id => 'logOutButton') }
      puts "Logging out"
      wrap { logout_button.click }
    rescue Exception
      # couldn't find the log out button -- means we were already logged out, which is good
    end
  end
  
  def get_next_message
    m = @@messages[@@currentMessage].strip.gsub(/\s+/, ' ')
    @@currentMessage += 1
    return m
  end

  def chatSomething
    message = get_next_message
    @last_message = "#{@username}: #{message}"
    chat_field = nil
    wrap { chat_field = @driver.find_element(:xpath, "//*[@id='chatCompose']//input") }
    wrap { chat_field.send_keys(message) }

    puts "Chatting a message on #{@browser}: #{message}"
    chat_button = nil
    wrap { chat_button = @driver.find_element(:xpath, "//*[@id='chatCompose']//*[@role='button' and not(contains(@class,'hidden'))]") }
    wrap { chat_button.click }
  end
  
  def verifyChat
    ## FIXME == we should probably wait up to 30 seconds for a chat to show up... that means evaluating this a bunch of times
    last_item_text = ""
    31.times do
      sleep 1
      last_item_text = nil
      wrap { last_item_text = @driver.find_element(:xpath, '//*[@id="chatListContent"]/*[last()]//*[contains(@class, "name")]').text }
      if last_item_text == @last_message
        puts "#{Time.now}: Last message received is correct"
        return
      end
    end
    @errors << {:message => "after 30 seconds, expected last chatted item to read: '#{@last_message}', but got '#{last_item_text}' instead", :time => Time.now}
    if @errors.size > ERROR_THRESHOLD && @errors[-3][:time] > (Time.now - ERROR_THRESHOLD*2*60)
      error_msg = ""
      ERROR_THRESHOLD.times do |i|
        error = @errors[0-(i+1)]
        error_msg << "\n(#{error[:time]}) #{error[:message]}"
      end
      
      raise "Too many errors on #{@browser} in the last #{ERROR_THRESHOLD*2} minutes! #{error_msg}"
    else
      puts "#{Time.now}: Last message incorrect, but haven't reached error threshold yet."
    end
  end
  
  private
  
  def wrap(max_times = 3)
    tries = 0
    begin
      tries += 1
      yield
    rescue EOFError
      if tries < max_times
        retry
      else
        raise
      end
    end
  end
end

begin
  @start_time = Time.now
  puts "#{@start_time}: Starting up"
  chatter1 = Chatter.new
  chatter1.init("firefox", true)

  chatter2 = Chatter.new
  chatter2.init("internet_explorer", false)

  chatter1.login('chat1')
  chatter2.login('chat2')

  while true do
    chatter1.chatSomething
    chatter1.verifyChat
    
    chatter2.chatSomething
    chatter2.verifyChat
  end

rescue Exception => e
  begin
    chatter1.logout
    chatter2.logout
  rescue Exception
  end
  
  puts "Error executing script: #{e}\n#{e.backtrace.join("\n")}"
  
  chatter1.quit
  chatter2.quit
end

