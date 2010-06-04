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
     }.property('dragons'),
  
  // isEmpty: true,
  
  dragonViews: function() {
    var view = SC.Label.design({
      layout: {top: 0, bottom: 0, left: 0, right: 0},
      value: "weeee!!!! I'm a dragon!"
    }).append();
    return view;
  }

}) ;
