// ==========================================================================
// Project:   Geniverse.DEFAULTACTIONS
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CcChat*/

/** @class

	(Document Your State Here)

	@extends SC.Responder
	@version 0.1
*/
Geniverse.DEFAULTACTIONS = SC.Responder.create(
/** @scope Contacts.DEFAULTACTIONS.prototype */ {

	/**
	The next state to check if this state does not implement the action.
	*/
	nextResponder: null,

	didBecomeFirstResponder: function() {
	// Called when this state becomes first responder
	},

	willLoseFirstResponder: function() {
	// Called when this state loses first responder
	},

	// ..........................................................
	// EVENTS
	//
	
	login: function(view) {
		var containerView = Geniverse.mainChatExamplePage.get('mainPane').get('appContainer');
		var mainAppView = containerView.get('mainAppView');
		containerView.set('nowShowing', mainAppView);
		
		function initChat(chatroom){
		  SC.Logger.log("logging into "+chatroom);
  		CcChat.chatController.initChat(chatroom);
		}
		CcChat.chatRoomController.getFirstChannelWithSpace('geniverse-chat-example', 3, initChat);
		
		
	}.observes('CcChat.chatController.username')
  
}) ;
