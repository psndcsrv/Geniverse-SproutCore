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
	
	isSelectedDidChange: function() {
		this.set('layerNeedsUpdate', YES);
	}.observes('isSelected'),

  // TODO: This could probably be done cleaner with child views...
  render: function(context) {
			context.push("<div style='width: 99%; height: 99%; text-align: center;" + this._selected_style() + "'>" + 
			   this._image_string() +
			  '</div>'
			);
  },

  _selected_style: function() {
		if (this.get('isSelected') === YES) {
			return "background-color: yellow;";
		} else {
			return "";
		}
	},

  _image_string: function() {
		return '<img src="' + this.getPath('content.imageURL') + '" style="width: ' + this.get('layout')['width'] + 'px; height: ' + this.get('layout')['height'] + 'px" />';
	}

});
