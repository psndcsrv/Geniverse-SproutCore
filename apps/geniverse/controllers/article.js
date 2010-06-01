// ==========================================================================
// Project:   Geniverse.articleController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.articleController = SC.ObjectController.create(
/** @scope Geniverse.articleController.prototype */ {
  
  init: function(){
    this.set('loadTimer', SC.Timer.schedule({
			target: this,
			action: '_subscribeToArticleChannel',
			interval: 500,
			repeats: YES
		}));
    
		sc_super();
  },
  
  loadTimer: null,
  
  articleChannel: null,

  textAreaValue: '',
  
  sendAction: function() {
    var articleChannel = this.get('articleChannel');
    if (articleChannel !== null){
      var username = CcChat.chatController.get('username');
      var message = {article: this.get('textAreaValue'), author: username};
      CcChat.chatController.post(articleChannel, message);
      SC.Logger.log(message + " sent on "+articleChannel);
      
      var chatChannel = CcChat.chatRoomController.get('channel');
      var infoMessage = {message: '<i>'+username+" has just published a draft.</i>"};
      CcChat.chatController.post(chatChannel, infoMessage);
    }
  },
  
  _subscribeToArticleChannel: function() {
    if (CcChat.chatController.chatHasInitialized && CcChat.chatRoomController.get('channel').length > 0){
      var articleChannel = CcChat.chatRoomController.get('channel') + "/articles";
      this.set('articleChannel', articleChannel);
      CcChat.chatController.subscribeToChannel(articleChannel, this.replaceArticleContents);
      
      SC.Logger.log("Article channel: "+this.get('articleChannel'));
      this.get('loadTimer').invalidate();
    }
  },
  
  replaceArticleContents: function(message) {
    var article = message.article;
    SC.Logger.log("Received an article! "+article);
    SC.RunLoop.begin();
    SC.Logger.log(Geniverse.articleController.get('textAreaValue'));
    Geniverse.articleController.set('textAreaValue', article);
    SC.Logger.log(Geniverse.articleController.get('textAreaValue'));
    SC.RunLoop.end();
  }

}) ;
