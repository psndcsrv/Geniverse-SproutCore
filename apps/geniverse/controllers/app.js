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
		
	  var challangeChannel = Geniverse.challangeController.get('baseChannelName');
	  var savedChatroom = Geniverse.userDefaults.readDefault('chatroom');
	  if (savedChatroom !== undefined && savedChatroom !== null && 
	    savedChatroom.length > 0 && savedChatroom.indexOf(challangeChannel) >= 0){
	    SC.Logger.log("auto-logging into "+savedChatroom);
	    initChat(savedChatroom);
  		Geniverse.challangeController.startChallange();
    } else {
      var maxUsers = Geniverse.challangeController.get('maxUsersInRoom');
  		CcChat.chatRoomController.getFirstChannelWithSpace(challangeChannel, maxUsers, initChat);
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
    
    window.location.reload();
	},
	
	welcomeMessage: function(){
	  var welcomeMessage = "[Not set]";
	  if (CcChat.chatController.get('chatHasInitialized')){
	    var userName = CcChat.chatController.get('username');
  	  var chatRoom = CcChat.chatRoomController.get('channelIndex');
  	  var group = parseInt(chatRoom, 10) + 1;
  	  welcomeMessage = "Welcome "+userName+", you are in group "+group;
    }
    // SC.Logger.log("returning "+welcomeMessage);
    this.set('welcomeMessageDuplicate', welcomeMessage);  // FIXME: why is this necessary?
    return welcomeMessage;
	}.property().observes('CcChat.chatController.chatHasInitialized'), // why is this necessary?
	
	welcomeMessageDuplicate: ""

}) ;
