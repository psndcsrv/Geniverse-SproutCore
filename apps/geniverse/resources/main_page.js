// ==========================================================================
// Project:   Geniverse - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

// This page describes the main user interface for your application.  
Geniverse.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'breedView listScrollView'.w(),
    
    breedView: Geniverse.BreedDragonView.design({
      layout: { centerX: -400, centerY: 0, width: 400, height: 450 }
    }),

		listScrollView: SC.ScrollView.design({
		  hasHorizontalScroller: NO,
      layout: { centerX: 100, centerY: 0, width: 600, height: 450 },
      backgroundColor: 'white',
      contentView: SC.ListView.design({
				contentBinding: 'Geniverse.bredOrganismsController.arrangedObjects',
				selectionBinding: 'Geniverse.bredOrganismsController.selection',
				rowHeight: 30,
				canEditContent: NO,
				contentIconKey: 'imageURL',
				hasContentIcon: YES,
				contentValueKey: 'info',
				escapeHTML: NO
      })
    })
  })

});
