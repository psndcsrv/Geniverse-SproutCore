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
	SC.ContentDisplay,SC.StaticLayout,
/** @scope Geniverse.OrganismView.prototype */ {
	organism: null,
	label: 'Organism',
	classNames: ['organism-view'],
	stripStyles: YES,
	useStaticLayout: YES,
	
	organismDidChange: function() {
		this.set('content', this.get('organism'));
		this.set('layerNeedsUpdate', YES);
	}.observes('organism'),
	
	isSelectedDidChange: function() {
		this.set('layerNeedsUpdate', YES);
	}.observes('isSelected'),

  // TODO: This could probably be done cleaner with child views...
  render: function(context, firstTime) {
			this._selected_style(context);
	    this._image_string(context);
	    if (this.get('stripStyles') === YES) {
				context.removeStyle('left');
	    	context.removeStyle('right');
	    	context.removeStyle('top');
	    	context.removeStyle('bottom');
			}
  },

  _selected_style: function(context) {
		if (this.get('isSelected') === YES) {
			context.addStyle("background-color: yellow;");
		}
	},

  _image_string: function(context) {
	  var newContext = context.begin('img');
	  newContext.attr('src', this.getPath('content.imageURL'));
		newContext.end();
	}

});
