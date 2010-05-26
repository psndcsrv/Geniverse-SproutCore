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
    if (containerView === undefined || containerView === null){
      return;
    }
	  this.mainAppView = containerView.get('mainAppView');
	  this.loginView = containerView.get('loginView');
	 
    var username = Geniverse.userDefaults.readDefault('username');
    if (username !== undefined && username !== null && username.length > 0){
      SC.Logger.log("automatically logging in as "+username);
      CcChat.chatController.set('username', username);    // this will kick-off login
    } else {
      SC.RunLoop.begin();
  		containerView.set('nowShowing', this.loginView);
      SC.RunLoop.end();
    }
  },
  
  login: function() {
    
    var username = CcChat.chatController.get('username');
    if (username === ""){
      return;
    }
    
		Geniverse.userDefaults.writeDefault('username', username);
		
		function initChat(chatroom){
  		CcChat.chatController.initChat(chatroom);
  		
  		Geniverse.userDefaults.writeDefault('chatroom', chatroom);
  		SC.Logger.log("logged into "+chatroom);
  		
  		Geniverse.challangeController.startChallange();
		}
		
	  var chatroom = Geniverse.userDefaults.readDefault('chatroom');
	  if (chatroom !== undefined && chatroom !== null && chatroom.length > 0){
	    SC.Logger.log("auto-logging into "+chatroom);
	    initChat(chatroom);
    } else {
  		CcChat.chatRoomController.getFirstChannelWithSpace('geniverse-chat-example', 3, initChat);
    }
    
		this.set('userLoggedIn', YES);
		
		var containerView = Geniverse.mainChatExamplePage.get('mainPane').get('appContainer');
    
    SC.RunLoop.begin();
		containerView.set('nowShowing', this.mainAppView);
    SC.RunLoop.end();
		
	}.observes('CcChat.chatController.username'),
	
	logout: function() {
	  SC.Logger.log("logging out "+CcChat.chatController.get('username'));
	  
	  CcChat.chatController.set('username', '');
		this.set('userLoggedIn', NO);
		
		Geniverse.userDefaults.writeDefault('username', '');
		Geniverse.userDefaults.writeDefault('chatroom', '');
		
    var containerView = Geniverse.mainChatExamplePage.get('mainPane').get('appContainer');
		
    SC.RunLoop.begin();
		containerView.set('nowShowing', this.loginView);
    SC.RunLoop.end();
	}

}) ;
