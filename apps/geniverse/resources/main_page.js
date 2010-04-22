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
    childViews: 'breedView mwAppletView tabView listScrollView questionsView'.w(),

    breedView: Geniverse.BreedDragonView.design({
      layout: { top: 0, left: 0, height: 200, width: 200 }
    }),

		tabView: SC.TabView.design({
			items: [
			  { title: "Page 1", value: "page1" },
				{ title: "Page 2", value: "page2" }
			],
			itemTitleKey: 'title',
		  itemValueKey: 'value',
			layout: { right: 0, top: 0, height: 200, width: 300 },
			nowShowing: "page1"
		}),
		
		listScrollView: SC.ScrollView.design({
		  hasHorizontalScroller: NO,
      layout: { left: 0, top: 200, height: 200, width: 200 },
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
			layout: {left: 0, bottom: 0, height: 300, width: 400}
		}),
		
		questionsView: SC.ScrollView.design({
			layout: {right: 0, bottom: 0, width: 200, height: 200},
			contentView: SC.StackedView.design({
				childViews: 'question1 question2 question3'.w(),

				question1: CC.QuestionView.design({
					useStaticLayout: YES,
					classNames: 'question1',
					prompt: "First Question: What is your name?"
				}),

				question2: CC.QuestionView.design({
					useStaticLayout: YES,
					classNames: 'question2',
					prompt: "First Question: What is your quest?"
				}),

				question3: CC.QuestionView.design({
					useStaticLayout: YES,
					classNames: 'question3',
					prompt: "First Question: What is your favorite color?"
				})
			})
		}),
		
		viewDidResize: function() {
			// we want to resize the widths and heights appropriately
			var width = this.get('layer').offsetWidth;
			var height = this.get('layer').offsetHeight;
			
			this._adjust_size(this.get('breedView'), { width: (width-5)/2, height: (height-10)/4});
			this._adjust_size(this.get('mwAppletView'), { width: (width-5-18)/2, height: (height-10-18)/2});
			this._adjust_size(this.get('listScrollView'), { width: (width-5)/2, height: (height-10)/4, top: (height-10)/4 + 5});
			this._adjust_size(this.get('tabView'), { width: (width-5)/2, height: (height-5)/2 });
			this._adjust_size(this.get('questionsView'), { width: (width-5)/2, height: (height-5)/2 });
		},
		
		_adjust_size: function(view, params) {
			for (var i in params) {
				view.adjust(i, params[i]);
			}
		}
		
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
		layout: {top: 15, bottom: 0, left: 0, right: 0},
		value: "<p>This is page 1!</p>",
		escapeHTML: NO
	}),
	
	page2: SC.LabelView.design({
		layout: {top: 15, bottom: 0, left: 0, right: 0},
		value: "This is page 2!"
	})

});
