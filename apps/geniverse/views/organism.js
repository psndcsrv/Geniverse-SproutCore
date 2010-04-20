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
	SC.ContentDisplay,
/** @scope Geniverse.OrganismView.prototype */ {
	organism: null,
	label: 'Organism',
	
	organismDidChange: function() {
		this.set('content', this.get('organism'));
		this.set('layerNeedsUpdate', YES);
	}.observes('organism'),

  // TODO: This could probably be done cleaner with child views...
  render: function(context) {
			context.push("<div style='width: 99%; height: 99%; text-align: center;'>" + 
			   this._image_string() +
			  '</div>'
			);
  },

  _image_string: function() {
		return '<img src="' + this.getPath('content.imageURL') + '" style="width: ' + this.get('layout')['width'] + 'px; height: ' + this.get('layout')['height'] + 'px" />';
	}

});
