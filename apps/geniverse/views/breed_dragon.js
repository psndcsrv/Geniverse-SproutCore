// ==========================================================================
// Project:   Geniverse.BreedDragonView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
require('controllers/breed_organism');
require('views/organism');
Geniverse.BreedDragonView = SC.View.extend(
/** @scope Geniverse.BreedDragonView.prototype */ {
	init: function() {
		this.set('loadTimer', SC.Timer.schedule({
			target: this,
			action: 'initParents',
			interval: 200,
			repeats: YES
		}));
		sc_super();
	},
	
	initParents: function() {
		if (typeof(generateDragonWithSex) != "undefined") {
			var self = this;
			Geniverse.BreedOrganismController.generateDragon(1, 'Mother', function(dragon) {
				SC.RunLoop.begin();
				self.set('mother', dragon);
				SC.RunLoop.end();
			});
			Geniverse.BreedOrganismController.generateDragon(0, 'Father', function(dragon) {
				SC.RunLoop.begin();
				self.set('father', dragon);
				SC.RunLoop.end();
			});
			this.get('loadTimer').invalidate();
		}
	},
	
  mother: null,
  father: null,
  child: null,

	childViews: 'motherView fatherView childView motherLabel fatherLabel childLabel breedButtonView'.w(),
	
	fatherView: Geniverse.OrganismView.design({
	  layout: { left: 188, top: 18, width: 188, height: 141 },
	  organismBinding: "*parentView.father"
	}),
	
	fatherLabel: SC.LabelView.design({
		layout: { left: 247, top: 0, width: 50, height: 18 },
		value: "Father"
	}),
	
	motherView: Geniverse.OrganismView.design({
	  layout: { left: 0, top: 18, width: 188, height: 141 },
	  organismBinding: "*parentView.mother"
	}),
	
	motherLabel: SC.LabelView.design({
		layout: { left: 59, top: 0, width: 50, height: 18 },
		value: "Mother"
	}),
	
	childView: Geniverse.OrganismView.design({
	  layout: { centerX: 0, top: 159, width: 188, height: 141 },
	  organismBinding: "*parentView.child"
	}),
	
	childLabel: SC.LabelView.design({
		layout: { centerX: 0, top: 147, width: 40, height: 18 },
		value: "Child"
	}),
	
	breedButtonView: SC.ButtonView.design({
		layout: { centerX: 0, top: 288, width: 100, height: 24 },
		action: "this.parentView.buttonAction",
		title: "Breed"
	}),
	
	buttonAction: function(source, event) {
		var self = this;
		this.breedButtonView.set('title', 'Generating...');
		Geniverse.BreedOrganismController.breedOrganism(this.get('mother'), this.get('father'), function handleChild(child) {
			SC.RunLoop.begin();
		  self.set('child', child);
		  self.breedButtonView.set('title', 'Breed');
			SC.RunLoop.end();
	  });
	}

});
