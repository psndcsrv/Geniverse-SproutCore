// ==========================================================================
// Project:   Geniverse
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CcChat*/

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Geniverse.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  Geniverse.getPath('mainChatExamplePage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

	Geniverse.store.commitRecordsAutomatically = YES;

	var query = SC.Query.local(Geniverse.Dragon,{conditions: 'bred = true', orderBy: 'storeKey'});
	// var query = SC.Query.local(Geniverse.Dragon,{conditions: 'bred = true', orderBy: 'sex,alleles'});
	var bred_organisms = Geniverse.store.find(query);
	Geniverse.bredOrganismsController.set('content', bred_organisms);
	
	var allDragonsQuery = SC.Query.local(Geniverse.Dragon,{conditions: 'sent = true', orderBy: 'storeKey'});
	var all_organisms = Geniverse.store.find(allDragonsQuery);
	Geniverse.allBredOrganismsController.set('content', all_organisms);
  
  var chatQuery = SC.Query.local(CcChat.ChatMessage,{orderBy: 'time'});
  var chats = CcChat.store.find(chatQuery);
  CcChat.chatListController.set('content', chats);
  
  var articlesQuery = SC.Query.local(Geniverse.Article,{orderBy: 'time'});
  var articles = Geniverse.store.find(articlesQuery);
  Geniverse.publishedArticlesController.set('content', articles);
  
  var challangeQuery =  SC.Query.local(Geniverse.Challange);
  var challange = Geniverse.store.find(challangeQuery).firstObject();
  Geniverse.challangeController.set('challange', challange);
  
  // log in automatically if UserDefaults found
  Geniverse.appController.checkLoginState();
  
  // Geniverse.makeFirstResponder(Geniverse.DEFAULTACTIONS);
} ;

function main() { 
  Geniverse.main(); 
  
  Geniverse.isLoaded = YES;
}
