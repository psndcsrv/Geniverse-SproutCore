// ==========================================================================
// Project:   Geniverse.InfoPanelView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Geniverse.InfoPanelView = SC.ButtonView.extend(
/** @scope Geniverse.InfoPanelView.prototype */ {

  title: "Instructions",
  
  target: 'Geniverse.infoPanelController',
  
  action: 'showInstructions'

});
