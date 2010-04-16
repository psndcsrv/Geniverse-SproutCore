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
	label: 'Organism',
	
	organismDidChange: function() {
		this.set('layerNeedsUpdate', YES);
	}.observes('organism'),

  // TODO: This could probably be done cleaner with child views...
  render: function(context) {
			context.push("<div style='width: 99%; height: 99%;'>" + 
			  '<div style="text-align: center; width: 100%;">' + this.get('label') + '</div>' +
			  '<div style="text-align: center;"><img src="' + this.getPath('organism.imageURL') + '" /></div>' +
			  "</div>"
			);
  }

});
