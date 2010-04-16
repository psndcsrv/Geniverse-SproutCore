// ==========================================================================
// Project:   Geniverse.BreedDragonView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
require('controllers/breed_organism')
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
			Geniverse.BreedOrganismController.generateDragon(0, 'Mother', function(dragon) { self.set('mother', dragon); });
			Geniverse.BreedOrganismController.generateDragon(1, 'Father', function(dragon) { self.set('father', dragon); });
			this.get('loadTimer').invalidate();
		}
	},
	
  mother: null,
  father: null,
  child: null,

	childViews: 'motherView fatherView childView breedButtonView'.w(),
	
	fatherView: Geniverse.OrganismView.design({
	  layout: { right: 0, top: 0, width: 188, height: 141 },
	  organismBinding: "*parentView.father",
	  label: "Father"
	}),
	
	motherView: Geniverse.OrganismView.design({
	  layout: { left: 0, top: 0, width: 188, height: 141 },
	  organismBinding: "*parentView.mother",
	  label: "Mother"
	}),
	
	childView: Geniverse.OrganismView.design({
	  layout: { centerX: 0, top: 141, width: 188, height: 141 },
	  organismBinding: "*parentView.child",
	  label: "Child"
	}),
	
	breedButtonView: SC.ButtonView.design({
		layout: { centerX: 0, top: 282, width: 100, height: 24 },
		action: "this.parentView.buttonAction",
		title: "Breed"
	}),
	
	buttonAction: function(source, event) {
		var self = this;
		this.breedButtonView.set('title', 'Generating...');
		Geniverse.BreedOrganismController.breedOrganism(this.get('mother'), this.get('father'), function handleChild(child) {
		  self.set('child', child);
		  self.breedButtonView.set('title', 'Breed');
	  });
	}

});
