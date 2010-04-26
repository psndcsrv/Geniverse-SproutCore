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
    childViews: 'breedView appletView tabView listScrollView tabQuestionsView'.w(),

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

		appletView: CC.AppletView.design({
		  jarBase: "http://jnlp.concord.org/dev/org/concord/",
		  jars: 'biologica/biologica-0.1.0-SNAPSHOT.jar biologica-applets/biologica-applets-0.1.0-SNAPSHOT.jar framework/framework-0.1.0-SNAPSHOT.jar frameworkview/frameworkview-0.1.0-SNAPSHOT.jar'.w(),
		  jarUrls: function() {
				var base = this.get('jarBase');
				var jars = this.get('jars');
				var out = '';
				for (var i = 0; i < jars.length; i++) {
					out += base + jars[i] + ', ';
				}
				return out;
			}.property('jarBase', 'jars').cacheable(),
			code: "org/concord/biologica/applet/ChromosomeApplet.class",
			layout: {left: 0, bottom: 0, height: 300, width: 400},
			selectionBinding: SC.Binding.from('Geniverse.bredOrganismsController.selection').oneWay().single(),
			selectionDidChange: function() {
				var selection = this.get('selection');
				if (selection !== null) {
					this.run(function(applet) {
						var org = applet.createOrganismWithAlleleStringAndSex(selection.get('alleles'), selection.get('sex'));
						applet.setOrganism(org);
					});
				}
			}.observes('selection')
		}),
		
		tabQuestionsView: SC.TabView.design({
			items: [
			  { title: "Questions", value: "questionsView" },
				{ title: "Rich Text", value: "richTextView" }
			],
			itemTitleKey: 'title',
		  itemValueKey: 'value',
			layout: { right: 0, bottom: 0, height: 200, width: 300 },
			nowShowing: "questionsView"
		}),
		
		viewDidResize: function() {
			// we want to resize the widths and heights appropriately
			var width = this.get('layer').offsetWidth;
			var height = this.get('layer').offsetHeight;
			
			this._adjust_size(this.get('breedView'), { width: (width-5)/2, height: (height-10)/4});
			this._adjust_size(this.get('appletView'), { width: (width-5-18)/2, height: (height-10-18)/2});
			this._adjust_size(this.get('listScrollView'), { width: (width-5)/2, height: (height-10)/4, top: (height-10)/4 + 5});
			this._adjust_size(this.get('tabView'), { width: (width-5)/2, height: (height-5)/2 });
			this._adjust_size(this.get('tabQuestionsView'), { width: (width-5)/2, height: (height-5)/2 });
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
	}),
	
	richTextView: SC.LabelView.design({
		layout: {left: 18, top: 18},
	  escapeHTML: NO,
		value: "This <em>could</em> be rich text maybe....<br><br> I think its centered as well..."
	}),
	
	questionsView: SC.ScrollView.design({
		layout: {left: 18, top: 18, right: 18, bottom: 18},
		contentView: SC.StackedView.design({
			childViews: 'question1 text1 question2 text2 question3 text3'.w(),

			question1: CC.QuestionView.design({
				useStaticLayout: YES,
				classNames: 'question1',
				prompt: "First Question: What is your name?"
			}),
			
			text1: SC.LabelView.design(SC.StaticLayout, {
				useStaticLayout: YES,
				escapeHTML: NO,
				value: "Text: Now that you've thought about your name, let's think about something a little more deep.<br/>&nbsp;"
			}),

			question2: CC.MultipleChoiceQuestionView.design({
				useStaticLayout: YES,
				classNames: 'question2',
				prompt: "Second Question: What is your quest?",
				choices: ["To seek the Holy Grail", "To find peace in my life", "To count all the stars in the sky"]
			}),
			
			text2: SC.LabelView.design(SC.StaticLayout, {
				useStaticLayout: YES,
				escapeHTML: NO,
				value: "Text: You've chosen to undertake quite a quest! One last question for you.<br/>&nbsp;"
			}),

			question3: CC.QuestionView.design({
				useStaticLayout: YES,
				classNames: 'question3',
				prompt: "Third Question: What is your favorite color?"
			}),
			
			text3: SC.LabelView.design(SC.StaticLayout, {
				useStaticLayout: YES,
				escapeHTML: NO,
				value: "That wasn't too hard, was it?<br/>&nbsp;"
			})
		})
	})

});
