// ==========================================================================
// Project:   Geniverse - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse, CC, java */
Geniverse.marginSize = 15;

require('views/article');
require('views/breed_dragon');
require('views/dragon_bin');
require('views/dragon_chat_compose');
require('views/organism');
require('views/published_articles');

Geniverse.appletDemoMainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'breedView appletView transcriptionApplet listScrollView tabQuestionsView'.w(),

    breedView: Geniverse.BreedDragonView.design({
      layout: { top: Geniverse.marginSize, left: Geniverse.marginSize, height: 200, width: 300 }
    }),

		transcriptionApplet: CC.MwAppletView.design({
			layout: { right: Geniverse.marginSize, top: Geniverse.marginSize, height: 200, width: 300 },
			cmlUrl: "http://mw2.concord.org/public/test/transcribe.cml",
			alleleDnaBinding: 'Geniverse.mainPage.mainPane.appletView*alleleDna',
			alleleDnaDidChange: function() {
				var self = this;
				this.run(function(applet){
					var dna = self._pad_dna(self.get('alleleDna'));
					// alert('setting dna: ' + dna);
					applet.runMwScript("mw2d:1:set DNA " + dna); 
				});
			}.observes('alleleDna'),

			_pad_dna: function(dna) {
				while (dna.length % 3 !== 0) {
					dna += "a";
				}
				return dna;
			}
		}),
		
		listScrollView: SC.ScrollView.design({
		  hasHorizontalScroller: NO,
      layout: { left: Geniverse.marginSize, top: 200, height: 200, width: 300 },
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
		  layout: {left: Geniverse.marginSize, bottom: Geniverse.marginSize, height: 300, width: 600},
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
			selectionBinding: SC.Binding.from('Geniverse.bredOrganismsController.selection').oneWay().single(),
			selectionDidChange: function() {
				var selection = this.get('selection');
				if (selection !== null) {
					this.run(function(applet) {
						var org = applet.getOrganism();
						org.getWorld().deleteAllOrganisms(true);
						org = applet.createOrganismWithAlleleStringAndSex(selection.get('alleles'), selection.get('sex'));
						applet.setOrganism(org);
					});
				}
			}.observes('selection'),
			
			init: function() {
				
				this.set('selectionPoller', SC.Timer.schedule({
					target: this,
					action: 'pollForAlleleSelection',
					interval: 500,
					repeats: YES
				}));
				
				sc_super();
			},
			
			pollForAlleleSelection: function() {
				var applet = this.appletInstance();
				if (applet !== null && typeof(applet.getView) != "undefined") {
					var view = applet.getView();
					if (view === null) { return; }
					var variant = view.getSelectedVariant();
					var dnaStr = this._get_variant_str(variant);
					if (dnaStr !== this.get('alleleDna')) {
						// alert('dna changed in applet selection: ' + dnaStr);
						this.set('alleleDna', dnaStr);
					}
				}
			},
			
			_get_variant_str: function(variant) {
				if (variant === null) {
					return '';
				}
				var length = variant.getLengthInBases();
				var seqStr = '';
				for (var i = 0; i < length; i++) {
					seqStr += this._get_base_str(variant.getBase(i));
				}
				return seqStr;
			},
			
			_get_base_str: function(base) {
				if (base === 1) {
					return "c";
				} else if (base === 2) {
					return "a";
				} else if (base === 3) {
					return "g";
				} else if (base === 4) {
					return "t";
				} else {
					return "";
				}
			}
		}),
		
		tabQuestionsView: SC.TabView.design({
	    layout: { right: Geniverse.marginSize, bottom: Geniverse.marginSize, height: 200, width: 600 },
			items: [
			  { title: "Questions", value: "questionsView" },
				{ title: "Rich Text", value: "richTextView" }
			],
			itemTitleKey: 'title',
		  itemValueKey: 'value',
			nowShowing: "questionsView"
		}),
		
		viewDidResize: function() {
			// we want to resize the widths and heights appropriately
			var width = this.get('layer').offsetWidth;
			var height = this.get('layer').offsetHeight;
			var two_border = 2 * Geniverse.marginSize;
			var three_border = 3 * Geniverse.marginSize;
      var four_border = 4 * Geniverse.marginSize;

      var box_width = (width - three_border) / 2;
      // LEFT (* 0.25 height)
      var left_quarter_height = (height - four_border) / 4;
      var left_half_height    = (height - four_border) / 2;
			this._adjust_size(this.get('breedView'),       { width: box_width, height: left_quarter_height});
			this._adjust_size(this.get('listScrollView'),  { width: box_width, height: left_quarter_height, top: left_quarter_height + Geniverse.marginSize});
      // LEFT (* 0.5 height)
			this._adjust_size(this.get('appletView'),      { width: box_width, height: left_half_height});
			
			// RIGHT (0.5)
			var right_half_height = 
			this._adjust_size(this.get('transcriptionApplet'), { width: box_width, height: (height-three_border)/2 });
			this._adjust_size(this.get('tabQuestionsView'),{ width: box_width, height: (height-three_border)/2 });
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
	
	richTextView: SC.LabelView.design({
		layout: {left: Geniverse.marginSize, top: Geniverse.marginSize},
	  escapeHTML: NO,
		value: "This <em>could</em> be rich text maybe....<br><br> I think its centered as well..."
	}),
	
	questionsView: SC.ScrollView.design({
		layout: {left: Geniverse.marginSize, top: Geniverse.marginSize, right: Geniverse.marginSize, bottom: Geniverse.marginSize},
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
