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
	  
		// get the container view from the helper method
		var containerView = Geniverse.mainChatExamplePage.get('mainPane').get('appContainer');
		
		// if there is a container view proceed
		if (containerView) {
		
			// first, store the alternate
			var alternateView = containerView.get('alternateView');
			// then swap the views
			containerView.set( 'alternateView', containerView.get('contentView') );
			// and show the alternate view
			containerView.set('nowShowing', alternateView);
		}
	}.observes('CcChat.chatController.username'),

	_getContainerViewFor: function(view) {
		if (!view) {
		  return;
		} 
	
		var containerView = view.get('parentView');		
		while (!containerView.get('isContainerView')) { 
			containerView = containerView.get('parentView');
			if (containerView.get('isMainPane')) { return containerView = null; }
		}

		return containerView;
	},
  
}) ;
