// ==========================================================================
// Project:   Geniverse.appController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.appController = SC.ObjectController.create(
/** @scope Geniverse.appController.prototype */ {

  userLoggedIn: NO,
  
  mainAppView: null,
  
  loginView: null,
  
  checkLoginState: function() {
    var containerView = Geniverse.mainChatExamplePage.get('mainPane').get('appContainer');
	  this.mainAppView = containerView.get('mainAppView');
	  this.loginView = containerView.get('loginView');
	 
    var username = Geniverse.userDefaults.readDefault('username');
    if (username !== undefined && username !== null && username.length > 0){
      SC.Logger.log("automatically loggin in as "+username);
      CcChat.chatController.set('username', username);
      this.login();
    } else {
      SC.RunLoop.begin();
  		containerView.set('nowShowing', this.loginView);
      SC.RunLoop.end();
    }
  },
  
  login: function() {
		
		function initChat(chatroom){
		  SC.Logger.log("logging into "+chatroom);
  		CcChat.chatController.initChat(chatroom);
		}
		CcChat.chatRoomController.getFirstChannelWithSpace('geniverse-chat-example', 3, initChat);
		
		Geniverse.userDefaults.writeDefault('username', CcChat.chatController.get('username'));
		
		this.set('userLoggedIn', YES);
		
		var containerView = Geniverse.mainChatExamplePage.get('mainPane').get('appContainer');
    
    SC.RunLoop.begin();
		containerView.set('nowShowing', this.mainAppView);
    SC.RunLoop.end();
		
	}.observes('CcChat.chatController.username'),
	
	logout: function() {
	  SC.Logger.log("logging out "+CcChat.chatController.get('username'));
	  
	  CcChat.chatController.set('username', '');
		Geniverse.userDefaults.writeDefault('username', '');
		this.set('userLoggedIn', NO);
		
    var containerView = Geniverse.mainChatExamplePage.get('mainPane').get('appContainer');
		
    SC.RunLoop.begin();
		containerView.set('nowShowing', this.loginView);
    SC.RunLoop.end();
	}

}) ;
