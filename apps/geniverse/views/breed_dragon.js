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
  mother: 'Mother',
  father: 'Father',
  child: 'Child',

	childViews: 'motherView fatherView childView breedButtonView'.w(),
	
	fatherView: Geniverse.OrganismView.design({
	  layout: { left: 0, top: 0, width: 100, height: 100 },
	  organismBinding: "*parentView.father"
	}),
	
	motherView: Geniverse.OrganismView.design({
	  layout: { left: 105, top: 0, width: 100, height: 100 },
	  organismBinding: "*parentView.mother"
	}),
	
	childView: Geniverse.OrganismView.design({
	  layout: { left: 52, top: 110, width: 100, height: 100 },
	  organismBinding: "*parentView.child"
	}),
	
	breedButtonView: SC.ButtonView.design({
		layout: { left: 65, top: 220, width: 75, height: 24 },
		action: "this.parentView.buttonAction",
		title: "Breed"
	}),
	
	buttonAction: function(source, event) {
		var self = this;
		Geniverse.BreedOrganismController.breedOrganism(this.get('mother'), this.get('father'), function handleChild(child) {
		  self.set('child', child);
	  });
	}

});
