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
      childViews: 'geniverseLabelView welcomeLabelView logoutButton'.w(),
      anchorLocation: SC.ANCHOR_TOP,
      
      geniverseLabelView: SC.LabelView.design({
        layout: { centerY: 0, height: 24, left: 8, width: 200 },
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        value:   'Geniverse'
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
      layout: { top: 56, bottom: 32, left: 50, right: 0 },
      
      contentView: null,
    	
    	loginView: CcChat.LoginView.create({
    		layout: {centerX: 0, top: Geniverse.marginSize, width: 500, height: 400}
    	}),
    	
      mainAppView: SC.View.create({
        
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

      		childViews: 'chatListView chatComposeView userListView'.w(),

        	chatListView: SC.ScrollView.design({
      		  hasHorizontalScroller: NO,
            layout: { right: Geniverse.marginSize, top: 0, height: 200, width: 300 },
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
          }),
      		
      		chatComposeView: CcChat.ChatComposeView.design({
            layout: { right: Geniverse.marginSize, top: 230, height: 200, width: 300 }
      		}),
      		
      		userListView: CcChat.UserListView.design({
            layout: {top: 450, right: Geniverse.marginSize, width: 300, height: 300}
          })
        })
    		
    	})
    })
  })
});
