// ==========================================================================
// Project:   Geniverse.dragonBinController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.dragonBinController = SC.ArrayController.create(
/** @scope Geniverse.dragonBinController.prototype */ {

  // TODO: Add your own code here.
  
  dragons: [],
  
  contentBinding: 'Geniverse.dragonBinController.dragons',
  
  isEmpty: function() {
    return this.get('dragons').length === 0;
  }.property('dragons')

}) ;
