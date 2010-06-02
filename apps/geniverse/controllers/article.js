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
  
  isStaticVisible: YES,
  
  isEditingVisible: NO,
  
  editAction: function() {
    
    var article = this._stringize(this.get('textAreaValue'));
    this.set('textAreaValue', article);
      
    this.set('isStaticVisible', NO);
    this.set('isEditingVisible', YES);
  },
  
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

  textAreaValue: '<i>Write your thoughts here.</i>',
  
  publishDraftAction: function() {
    var article = this._htmlize(this.get('textAreaValue'));
    this.set('textAreaValue', article);
    
    var articleChannel = this.get('articleChannel');
    if (articleChannel !== null){
      var username = CcChat.chatController.get('username');
      var message = {article: article, author: username};
      CcChat.chatController.post(articleChannel, message);
      
      var chatChannel = CcChat.chatRoomController.get('channel');
      var infoMessage = {message: '<i>'+username+" has just published a draft.</i>"};
      CcChat.chatController.post(chatChannel, infoMessage);
    }
    this.set('isStaticVisible', YES);
    this.set('isEditingVisible', NO);
  },
  
  _subscribeToArticleChannel: function() {
    if (CcChat.chatController.chatHasInitialized && CcChat.chatRoomController.get('channel').length > 0){
      var articleChannel = CcChat.chatRoomController.get('channel') + "/articles";
      this.set('articleChannel', articleChannel);
      CcChat.chatController.subscribeToChannel(articleChannel, this.replaceArticleContents);
      
      this.get('loadTimer').invalidate();
    }
  },
  
  replaceArticleContents: function(message) {
    var article = message.article;
    Geniverse.articleController.set('textAreaValue', article);
  },
  
  _htmlize: function(text) {
    text = text.replace(/\n/g, "<br>");
    return text;
  },
  
  _stringize: function(text) {
    text = text.replace(/<br>/g, "\n");
    return text;
  }

}) ;
