// ==========================================================================
// Project:   Geniverse.BreedOrganismController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CcChat GenGWT*/

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
require('controllers/bred_organisms');
Geniverse.breedOrganismController = SC.ObjectController.create(
/** @scope Geniverse.BreedOrganismController.prototype */
{
  bredOrganisms: [],

  breedOrganism: function(mother, father, handleChildFunction) {
    var self = this;
    if (mother !== null && mother.get('gOrganism') !== null && father !== null && father.get('gOrganism') !== null) {
      var onSuccess = function(organism) {
        var child = Geniverse.store.createRecord(Geniverse.Dragon, {
					bred: YES, mother: mother, father: father
				});
        child.set('gOrganism', organism);
        
        handleChildFunction(child);
      };
      GenGWT.breedDragon(mother.get('gOrganism'), father.get('gOrganism'), onSuccess);
    }
  },

  generateDragon: function(sex, name, callback) {
    // alert('generating dragon');
    var self = this;
    var handleGOrg = function(gOrg) {
      var org = Geniverse.store.createRecord(Geniverse.Dragon, {bred: NO});
      org.set('gOrganism', gOrg);
      self.invokeLater(function() {
        org.set('name', name);
      });
      callback(org);
    };
    GenGWT.generateDragonWithSex(sex, handleGOrg);
  }

});
