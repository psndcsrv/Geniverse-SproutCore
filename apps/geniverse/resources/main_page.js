// ==========================================================================
// Project:   Geniverse - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse, CC */

// This page describes the main user interface for your application.  
Geniverse.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'breedView mwAppletView tabView listScrollView'.w(),

    breedView: Geniverse.BreedDragonView.design({
      layout: { centerY: -225, centerX: -100, height: 150, width: 200 }
    }),

		tabView: SC.TabView.design({
			items: [
			  { title: "Page 1", value: "page1" },
				{ title: "Page 2", value: "page2" }
			],
			itemTitleKey: 'title',
		  itemValueKey: 'value',
			layout: { centerX: 120, centerY: -150, width: 200, height: 300 },
			nowShowing: "page1"
		}),
		
		listScrollView: SC.ScrollView.design({
		  hasHorizontalScroller: NO,
      layout: { centerY: -75, centerX: -100, height: 150, width: 200 },
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

		mwAppletView: CC.MwAppletView.design({
		  cmlUrl: "http://mw2.concord.org/public/student/classic/machine/bike.cml",
			layout: {centerX: -100, centerY: 160, height: 300, width: 400}
		})
		
		// gridScrollView: SC.ScrollView.design({
		//   hasHorizontalScroller: NO,
		// 	layout: { centerX: -130, centerY: 0, width: 310, height: 480 },
		//       backgroundColor: 'white',
		//       contentView: SC.GridView.design({
		// 		contentBinding: 'Geniverse.bredOrganismsController.arrangedObjects',
		// 		selectionBinding: 'Geniverse.bredOrganismsController.selection',
		// 		rowHeight: 60,
		// 		columnWidth: 60,
		// 		canEditContent: NO,
		// 		exampleView: Geniverse.OrganismView,
		// 		isSelectable: YES
		//       })
    // })
  }),

	page1: SC.LabelView.design({
		value: "<p>This is page 1!</p>",
		escapeHTML: NO
	}),
	
	page2: SC.LabelView.design({
		value: "This is page 2!"
	})

});
