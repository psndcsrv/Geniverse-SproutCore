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
	classNames: ['organism-view'],
	contentBinding: '*organism',
	childViews: 'imageView'.w(),
  allowDrop: NO,
  parent: '',       // 'mother' or 'father'. Needed for drag and drop
  sex: 0,        // 0 or 1. Needed for drag and drop
  
  isDropTarget: YES,
	
	imageView: SC.ImageView.design({
		layout: {top: 0, bottom: 0, left: 0, right: 0},
		contentBinding: '*parentView.content',
		contentValueKey: 'imageURL',
		canLoadInBackground: NO,
		useImageCache: NO
	}),
	
	contentDidChange: function() {
		this.setPath('imageView.layerNeedsUpdate', YES);
	}.observes('content'),
	
	isSelectedDidChange: function() {
		this.set('layerNeedsUpdate', YES);
	}.observes('isSelected'),

  // TODO: This could probably be done cleaner with child views...
  render: function(context, firstTime) {
			this._selected_style(context);
	    sc_super();
  },

  _selected_style: function(context) {
		if (this.get('isSelected') === YES) {
			context.addStyle("background-color: yellow;");
		}
	},
	
	// drag methods:
	
	mouseDown: function(evt) {
	  SC.Drag.start({ 
      event: evt, 
      source: this, 
      dragView: this.get('imageView'), 
      ghost: YES, 
      slideBack: YES, 
      dataSource: this 
    }) ;
	},
	// drop methods:
  acceptDragOperation: function(drag, op) {
    var dragon = this._getSourceDragon(drag);
      var sex = dragon.get('sex');
      if (this.get('allowDrop') && sex === this.get('sex')){
        this.get('parentView').set(this.get('parent'), dragon);
        this.get('parentView').set('child', null);
      }
      // this.appendChild(drag.get('source')) ;
      return op ;
    },

  computeDragOperations: function(drag, evt) {
    return SC.DRAG_ANY ;
  },
  
  dragEntered: function(drag, evt) {
    var sex = this._getSourceDragon(drag).get('sex');
    if (this.get('allowDrop') && sex === this.get('sex')){
      this.$().addClass('drop-target') ;
    }
  },

  dragExited: function(drag, evt) {
    this.$().removeClass('drop-target') ;
  },
  
  _getSourceDragon: function(dragEvt) {
    var sourceDragon;
    if ((""+dragEvt.get('source').constructor === 'Geniverse.OrganismView')){
      sourceDragon = dragEvt.get('source').get('organism');
    } else {
      sourceDragon = dragEvt.get('source').get('selection').get('firstObject');
    }
    return sourceDragon;
  }

});
