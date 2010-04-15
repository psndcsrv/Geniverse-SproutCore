// ==========================================================================
// Project:   Geniverse.BreedOrganismController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.BreedOrganismController = SC.ObjectController.create(
/** @scope Geniverse.BreedOrganismController.prototype */ {

  breedOrganism: function(mother, father, handleChildFunction) {
		handleChildFunction('child: ' + Math.random());
  }

}) ;
