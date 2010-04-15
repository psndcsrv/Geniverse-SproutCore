// ==========================================================================
// Project:   Geniverse.OrganismView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Geniverse.OrganismView = SC.View.extend(
/** @scope Geniverse.OrganismView.prototype */ {
	organism: null,
	
	organismDidChange: function() {
		this.set('layerNeedsUpdate', YES);
	}.observes('organism'),

  // TODO: Add your own code here.
  render: function(context) {
			context.push("<div style='border: 1px solid #cccccc; width: 99%; height: 99%;'>" + 
			  '<img src="' + this.getPath('organism.imageURL') + '" />' +
			  "</div>"
			);
  }

});
