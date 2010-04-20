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
    childViews: 'breedView gridScrollView'.w(),
    
    breedView: Geniverse.BreedDragonView.design({
      layout: { centerX: -400, centerY: 0, width: 400, height: 450 }
    }),

		tabView: SC.TabView.design({
			// value: "Geniverse.mainPage.mainPane.listScrollView",
			items: [
			  { title: "List", value: "Geniverse.mainPage.mainPane.listScrollView" },
				{ title: "Grid", value: "Geniverse.mainPage.mainPane.gridScrollView" }
			],
			itemTitleKey: 'title',
      itemValueKey: 'value',
			layout: { centerX: 100, centerY: 0, width: 620, height: 480 },
			userDefaultKey: "mainPanel"
		}),
		
		listScrollView: SC.ScrollView.design({
		  hasHorizontalScroller: NO,
      layout: { left: 0, top: 0, width: 600, height: 450 },
      backgroundColor: 'white',
      contentView: SC.ListView.design({
				contentBinding: 'Geniverse.bredOrganismsController.arrangedObjects',
				selectionBinding: 'Geniverse.bredOrganismsController.selection',
				rowHeight: 30,
				canEditContent: NO,
				contentIconKey: 'imageURL',
				hasContentIcon: YES,
				contentValueKey: 'info'
      })
    }),

		gridScrollView: SC.ScrollView.design({
		  hasHorizontalScroller: NO,
      // layout: { left: 0, top: 0, width: 600, height: 450 },
			layout: { centerX: 100, centerY: 0, width: 620, height: 480 },
      backgroundColor: 'white',
      contentView: SC.GridView.design({
				contentBinding: 'Geniverse.bredOrganismsController.arrangedObjects',
				selectionBinding: 'Geniverse.bredOrganismsController.selection',
				rowHeight: 60,
				columnWidth: 60,
				canEditContent: NO,
				exampleView: Geniverse.OrganismView
      })
    })
  })

});
