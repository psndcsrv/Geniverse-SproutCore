// ==========================================================================
// Project:   Geniverse - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse, CC, CcChat, java */
Geniverse.marginSize = 15;
// This page describes the main user interface for your application.  
Geniverse.mainChatExamplePage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    defaultResponder: Geniverse,
    
    childViews: 'appContainer'.w(),
    
    appContainer: SC.ContainerView.design({
      isContainerView: YES,
      layout: { top: 36, bottom: 32, left: 50, right: 0 },
      contentView: CcChat.LoginView.design({
    		layout: {centerX: 0, top: Geniverse.marginSize, width: 500, height: 400}
    	}),
      alternateView: SC.View.create({
        
        childViews: 'breedView listScrollView chatView'.w(),
        
        breedView: Geniverse.BreedDragonView.design({
          layout: { top: Geniverse.marginSize, left: Geniverse.marginSize, height: 200, width: 400 }
        }),

    		listScrollView: SC.ScrollView.design({
    		  hasHorizontalScroller: NO,
          layout: { left: Geniverse.marginSize, top: 250, height: 200, width: 400 },
          backgroundColor: 'white',
          contentView: SC.ListView.design({
    				contentBinding: 'Geniverse.bredOrganismsController.arrangedObjects',
    				selectionBinding: 'Geniverse.bredOrganismsController.selection',
    				rowHeight: 30,
    				canEditContent: NO,
    				contentIconKey: 'imageURL',
    				hasContentIcon: YES,
    				contentValueKey: 'info',
    				isSelectable: YES
          })
        }),
        
        chatView: SC.StackedView.design({
          layout: { right: Geniverse.marginSize, top: Geniverse.marginSize, width: 500, height: 400 },

      		childViews: 'chatComposeView chatListView'.w(),

      		chatComposeView: CcChat.ChatComposeView.design({
        		layout: {top: 10, left: 0}
        	}),

        	chatListView: SC.ScrollView.design({
      		  hasHorizontalScroller: NO,
            layout: { left: 0, bottom: 0, height: 200, width: 600 },
            backgroundColor: 'white',
            contentView: SC.ListView.design({
      				contentBinding: 'CcChat.chatListController.arrangedObjects',
      				selectionBinding: 'CcChat.chatListController.selection',
      				rowHeight: 30,
      				canEditContent: NO,
      				hasContentIcon: YES,
      				contentValueKey: 'message',
      				isSelectable: YES,
      				showAlternatingRows: YES,
      				exampleView: CcChat.ChatMessageView
            })
          })
        })
    		
    	})
    })
  })
});
