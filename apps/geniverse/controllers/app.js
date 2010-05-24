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
  
  login: function() {
		var containerView = Geniverse.mainChatExamplePage.get('mainPane').get('appContainer');
		var mainAppView = containerView.get('mainAppView');
		containerView.set('nowShowing', mainAppView);
		
		function initChat(chatroom){
		  SC.Logger.log("logging into "+chatroom);
  		CcChat.chatController.initChat(chatroom);
		}
		CcChat.chatRoomController.getFirstChannelWithSpace('geniverse-chat-example', 3, initChat);
		this.set('userLoggedIn', YES);
		
	}.observes('CcChat.chatController.username')

}) ;
