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
    // defaultResponder: Geniverse,
    
    childViews: 'topBar appContainer'.w(),
    
    topBar: SC.ToolbarView.design({
      layout: { top: 0, left: 0, right: 0, height: 36 },
      
      childViews: 'geniverseLabelView instructions welcomeLabelView logoutButton'.w(),
      
      anchorLocation: SC.ANCHOR_TOP,
      
      geniverseLabelView: SC.LabelView.design({
        layout: { centerY: 0, height: 24, left: 8, width: 200 },
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        value:   'Geniverse'
      }),
      
      instructions: Geniverse.InfoPanelView.design({
        layout: { centerY: 0, height: 24, left: 200, width: 200 },
        isVisibleBinding: 'Geniverse.appController.userLoggedIn'
      }),
      
      welcomeLabelView: SC.LabelView.design({
        layout: { centerY: 0, height: 24, right: 130, width: 150},
        fontWeight: SC.BOLD_WEIGHT,
        valueBinding: 'CcChat.loginController.welcomeMessage',
        isVisibleBinding: 'Geniverse.appController.userLoggedIn'
      }),

      logoutButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 12, width: 100 },
        title:  "Log out",
        target: 'Geniverse.appController',
        action: 'logout',
        isVisibleBinding: 'Geniverse.appController.userLoggedIn'
      })
    }),
    
    appContainer: SC.ContainerView.design({
      isContainerView: YES,
      layout: { top: 56, bottom: 10, left: 10, right: 0 },
      
      contentView: null,
      
      loginView: SC.View.create({
          childViews: 'info info2 login'.w(),
          
          info: SC.LabelView.design({
            layout: {centerX: 0, top: 30, width: 500, height: 25},
            controlSize: SC.LARGE_CONTROL_SIZE,
            value: "Welcome to the Geniverse Demo page."
          }),
          
          info2: SC.LabelView.design({
            layout: {centerX: 0, top: 60, width: 500, height: 25},
            value: "Please enter the login name of your choice:"
          }),
          
          login: CcChat.LoginView.design({
        		layout: {centerX: 0, top: 120, width: 500, height: 400}
        	})
      }),
    	
    	
    	
      mainAppView: SC.View.create({
        
        childViews: 'breedView listViews sendSelectedDragonView chatView allArticlesView'.w(),
        
        breedView: Geniverse.BreedDragonView.design({
          layout: { top: Geniverse.marginSize, left: Geniverse.marginSize, height: 230, width: 450 },
          initParentsImmediately: NO
        }),
        
        listViews: SC.TabView.design({ 
          layout: { left: Geniverse.marginSize, bottom: 65, height: 220, width: 450 },
          items: [ 
            {title: "Bred dragons", value: "Geniverse.mainChatExamplePage.bredDragonsScrollView" },
            {title: "Group dragons", value: "Geniverse.mainChatExamplePage.allDragonsScrollView" }
          ], 
          itemTitleKey: 'title', 
          itemValueKey: 'value',
          nowShowingBinding: 'Geniverse.bredOrganismsController.nowShowing' // hack for defining the startup tab 
          
        }),
        
        sendSelectedDragonView: SC.ButtonView.design({
          layout: { bottom: 30, height: 24, left: Geniverse.marginSize + 150, width: 150 },
          title:  "Send selected dragon",
          target: 'Geniverse.dragonChattingController',
          action: "chatDragon"
        }),
        
        allArticlesView: SC.TabView.design({ 
          layout: { top: Geniverse.marginSize, right: Geniverse.marginSize, height: 250, width: 510},
          items: [ 
            {title: "Your paper", value: "Geniverse.mainChatExamplePage.yourArticleView" },
            {title: "Published papers", value: "Geniverse.mainChatExamplePage.publishedArticlesView" }
          ], 
          itemTitleKey: 'title', 
          itemValueKey: 'value',
          nowShowingBinding: 'Geniverse.articleController.nowShowing' // hack for defining the startup tab 
          
        }),
        
        chatView: SC.StackedView.design({
          layout: { right: Geniverse.marginSize, bottom: 0, width: 500, height: 330 },

      		childViews: 'chatListView chatComposeView userListView userListLabel'.w(),

        	chatListView: CC.AutoScrollView.design({
      		  hasHorizontalScroller: NO,
            layout: { left: 0, top: 0, height: 200, width: 300 },
            backgroundColor: 'white',
            contentView: SC.StackedView.design({
      				contentBinding: 'CcChat.chatListController.arrangedObjects',
      				selectionBinding: 'CcChat.chatListController.selection',
      				rowHeight: 30,
      				canEditContent: NO,
      				hasContentIcon: YES,
      				contentValueKey: 'message',
      				isSelectable: YES,
      				showAlternatingRows: YES,
      				exampleView: CcChat.ChatMessageView
            }),
            autoScrollTriggerBinding:  'CcChat.chatListController.length'
          }),
      		
      		chatComposeView: CcChat.ChatComposeView.design({
            layout: { left: 0, top: 230, height: 200, width: 300 }
      		}),
      		
      		userListLabel: SC.LabelView.design({
      		  layout: {top: 0, right: 20, width: 100},
      		  value: "Users in room"
      		}),
      		
      		userListView: CcChat.UserListView.design({
            layout: {top: 40, right: 0, width: 150, height: 200}
          })
        })
    	})
    })
  }),
  
  yourArticleView: Geniverse.ArticleView.design({
    layout: { left: 5, top: 10, height: 220}
  }),
  
  publishedArticlesView: Geniverse.PublishedArticlesView.design({
    layout: { left: 5, top: 10, height: 220}
  }),
  
  bredDragonsScrollView: CC.AutoScrollView.design({
	  hasHorizontalScroller: NO,
    layout: { left: 0, top: 0, right: 0, height: 200 },
    backgroundColor: 'white',
    contentView: SC.ListView.design({
			contentBinding: 'Geniverse.bredOrganismsController.arrangedObjects',
			selectionBinding: 'Geniverse.bredOrganismsController.selection',
			rowHeight: 30,
			canEditContent: NO,
			contentIconKey: 'imageURL',
			hasContentIcon: YES,
			contentValueKey: 'info',
			isSelectable: YES,
			dragDataTypes: ['dragon']
    }),
    autoScrollTriggerBinding: 'Geniverse.bredOrganismsController.length'
  }),

	allDragonsScrollView: CC.AutoScrollView.design({
	  hasHorizontalScroller: NO,
    layout: { left: 0, top: 0, right: 0, height: 200 },
    backgroundColor: 'white',
    contentView: SC.ListView.design({
			contentBinding: 'Geniverse.allBredOrganismsController.arrangedObjects',
			selectionBinding: 'Geniverse.allBredOrganismsController.selection',
			rowHeight: 30,
			canEditContent: NO,
			contentIconKey: 'imageURL',
			hasContentIcon: YES,
			contentValueKey: 'info',
			dragDataTypes: ['dragon'],
			isSelectable: YES
    }),
    autoScrollTriggerBinding: 'Geniverse.allBredOrganismsController.length'
  })
  
});
