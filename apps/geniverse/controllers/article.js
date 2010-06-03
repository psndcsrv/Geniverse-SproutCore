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
  
  isDraftDirty: NO,             // article edited by user since a draft was sent?
  
  isDraftChanged: NO,           // article updated from last published state?
  
  loadTimer: null,
  
  articleDraftChannel: null,
  
  articlePublishingChannel: null,

  claimValue: "<i>Write your thoughts here.</i>",
  
  evidenceValue: '',
  
  combinedArticle: function() {
    var claim = this._htmlize(this.get('claimValue'));
    var evidence = this._htmlize(this.get('evidenceValue'));
    
    if (claim !== null && claim.length > 0){
      claim = "<div class='claim'>"+claim+"</div>";
    }
    
    if (evidence !== null && evidence.length > 0){
      evidence = "<div class='evidence'>"+evidence+"</div>";
    }
    
    var article = claim + evidence;
    return article;
    
  }.property('claimValue', 'evidenceValue'),
  
  currentArticle: null,         // state of article before editing, stringized
  
  publishedArticle: null,       // last published text
  
  nowShowing: 'Geniverse.mainChatExamplePage.yourArticleView',      // hack for defining start-up tab
  
  init: function(){
    this.set('loadTimer', SC.Timer.schedule({
			target: this,
			action: '_subscribeToArticleChannels',
			interval: 500,
			repeats: YES
		}));
		
    this.set('publishedArticle', this.get('combinedArticle'));
    
		sc_super();
  },
  
  editAction: function() {
    var article = this.get('combinedArticle');
    this.set('combinedArticle', article);
    this.set('currentArticle', article);
    
    this.setClaimAndEvidence(article);
      
    this.set('isStaticVisible', NO);
    this.set('isEditingVisible', YES);
  },
  
  setClaimAndEvidence: function(article){
    var pattern = /<div class='claim'>(.*?)<\/div>/;
    var matches = article.match(pattern);
    var claim = matches !== null ? matches[1] : "";
    
    pattern = /<div class='evidence'>(.*?)<\/div>/;
    matches = article.match(pattern);
    var evidence = matches !== null ? matches[1] : "";

    this.set('claimValue', this._stringize(claim));
    this.set('evidenceValue', this._stringize(evidence));
  },
  
  previewDraftAction: function() {
    var editedArticle = this.get('combinedArticle');
    if (editedArticle !== this.get('currentArticle')){
       this.set('isDraftDirty', YES);
    }
    var htmlizedArticle = this._htmlize(editedArticle);
    this.set('isDraftChanged', (htmlizedArticle !== this.get('publishedArticle')));
    
    this.set('combinedArticle', htmlizedArticle);
    this.set('isStaticVisible', YES);
    this.set('isEditingVisible', NO);
  },
  
  sendDraftAction: function(notify) {
    var article = this._htmlize(this.get('combinedArticle'));
    
    var articleDraftChannel = this.get('articleDraftChannel');
    if (articleDraftChannel !== null){
      var username = CcChat.chatController.get('username');
      var message = {article: article, author: username};
      CcChat.chatController.post(articleDraftChannel, message);
      
      if (notify === undefined || notify){
        var chatChannel = CcChat.chatRoomController.get('channel');
        var infoMessage = {message: '<i>'+username+" has just updated the draft paper.</i>"};
        CcChat.chatController.post(chatChannel, infoMessage);
      }
    }
  },
  
  publishAction: function() {
    this.sendDraftAction(false);
    
    var article = this._htmlize(this.get('combinedArticle'));
    
    var articleDraftChannel = this.get('articlePublishingChannel');
    if (articleDraftChannel !== null){
      var username = CcChat.chatController.get('username');
      var message = {article: article, author: username};
      CcChat.chatController.post(articleDraftChannel, message);
      
      this.set('publishedArticle', article);
    }
  },
  
  _subscribeToArticleChannels: function() {
    if (CcChat.chatController.chatHasInitialized && CcChat.chatRoomController.get('channel').length > 0){
      
      var articleDraftChannel = CcChat.chatRoomController.get('channel') + "/articles";
      this.set('articleDraftChannel', articleDraftChannel);
      CcChat.chatController.subscribeToChannel(articleDraftChannel, this.receiveDraftArticle);
      
      var articlePublishingChannel = CcChat.chatRoomController.get('baseChannelName') + "/articles";
      this.set('articlePublishingChannel', articlePublishingChannel);
      CcChat.chatController.subscribeToChannel(articlePublishingChannel, this.receivePublishedArticle);
      
      this.get('loadTimer').invalidate();
    }
  },
  
  receiveDraftArticle: function(message) {
    var article = message.article;
    
    Geniverse.articleController.setClaimAndEvidence(article);
    
    Geniverse.articleController.set('isDraftDirty', NO);
    Geniverse.articleController.set('isDraftChanged', (article !== Geniverse.articleController.get('publishedArticle')));
  },
  
  receivePublishedArticle: function(message) {
    var article = message.article;
    var now = new Date().getTime();
    
    var publishedArticle = Geniverse.store.createRecord(Geniverse.Article, {
      text: message.article, authors: message.author, time: now
    });
    
    CcChat.chatController.addMessage({message: "<i><b>A new paper has been published by "+message.author+"</b></i>"});
  },
  
  _htmlize: function(text) {
    if (!text){
      return "";
    }
    text = text.replace(/\n/g, "<br>");
    return text;
  },
  
  _stringize: function(text) {
    if (!text){
      return "";
    }
    text = text.replace(/<br>/g, "\n");
    return text;
  }

}) ;
