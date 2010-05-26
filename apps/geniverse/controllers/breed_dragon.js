// ==========================================================================
// Project:   Geniverse.breedDragonController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse generateDragonWithSex*/

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.breedDragonController = SC.ObjectController.create(
/** @scope Geniverse.breedDragonController.prototype */ {

  latestChild: null,
  
  mother: null,
  
  father: null,
  
  child: null,
  
  loadTimer: null,
  
  breedButtonTitle: 'Breed',
  
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
		  SC.Logger.log('found gwt');
			var self = this;
			Geniverse.breedOrganismController.generateDragon(1, 'Mother', function(dragon) {
				SC.RunLoop.begin();
				self.set('mother', dragon);
				SC.RunLoop.end();
			});
			Geniverse.breedOrganismController.generateDragon(0, 'Father', function(dragon) {
				SC.RunLoop.begin();
				self.set('father', dragon);
				SC.RunLoop.end();
			});
			this.get('loadTimer').invalidate();
		}
	},
	
	breed: function() {
	  var self = this;
		this.set('breedButtonTitle', 'Generating...');
		Geniverse.breedOrganismController.breedOrganism(this.get('mother'), this.get('father'), function handleChild(child) {
			SC.RunLoop.begin();
		  self.set('child', child);
		  self.set('breedButtonTitle', 'Breed');
			SC.RunLoop.end();
	  });
	}
}) ;
