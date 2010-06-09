// ==========================================================================
// Project:   Geniverse.DragonBinView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CC*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Geniverse.DragonBinView = SC.View.extend( SC.Border,
/** @scope Geniverse.PublishedArticles.prototype */ {
  
  dragonsBinding: 'Geniverse.dragonBinController.dragons',
  
  dragonViews: [],
  
  init: function() {
    SC.Timer.schedule({
			target: this,
			action: 'stupidUpdate',
			interval: 200,
			repeats: YES
		});
		
    sc_super();
  },
  
  // FIXME: updateDragonViews() does not seem to correctly get updated on dragons change
  // unless we explicitly call propertyDidChange...
  stupidUpdate: function() {
    this.propertyDidChange('dragons');
  },

  borderStyle: function(){
    if (this.get('isDropTarget')){
      return SC.BORDER_BLACK;
    } else {
      return null;
    }
  }.property().cacheable(),
  
  isDropTarget: YES,
  
  childViews: 'addDragonsLabel'.w(),
  
  showAddDragonsLabel: function() {
    SC.Logger.log('showAddDragonsLabel');
    return (this.get('isDropTarget') && Geniverse.dragonBinController.get('isEmpty'));
  }.property('Geniverse.dragonBinController.isEmpty'),
  
  addDragonsLabel: SC.LabelView.design({
    layout: {left: 5, top: 0, right: 5, bottom: 0},
    value: "Drag dragons here to attach them as evidence",
    isVisibleBinding: '*parentView.showAddDragonsLabel'
  }),
  
  updateDragonViews: function() {
    function contains(a, obj) {
      var i = a.length;
      while (i--) {
        if (a[i] === obj) {
          return true;
        }
      }
      return false;
    }
    
    // clear dragons
    var dragonViews = this.get('dragonViews');
    for (var j = 0; j < dragonViews.length; j++){
      this.removeChild(dragonViews[j]);
    }
    this.set('dragonViews', []);
    
    // add dragon views
    var dragons = this.get('dragons');
    for (var i = 0; i < dragons.length; i++){
        this.addDragonView(dragons[i], i);
    }
    
  }.observes('dragons'),
  
  addDragonView: function(dragon, i) {
    var height = this.get('layout').height;
    var dragonView = Geniverse.OrganismView.create({
      layout: {top: 0, bottom: 0, left: (i * height), width: height},
      organism: dragon,
      backgroundColor: 'white'
    });
    this.appendChild(dragonView);
    dragonView.set('organism', dragon);
    
    this.get('dragonViews')[i] = dragonView;
  },
  
  // drag methods.
	acceptDragOperation: function(drag, op) {
	  var dragon = this._getSourceDragon(drag);
	  var dragons = Geniverse.dragonBinController.get('dragons');
	  dragons.push(dragon);
	  
    Geniverse.dragonBinController.set('dragons', dragons);
    this.propertyDidChange('showAddDragonsLabel');    // FIXME: why doesn't showAddDragonsLabel update automatically?
	  
    return op ;
  },

  computeDragOperations: function(drag, evt) {
    return SC.DRAG_ANY ;
  },
  
  dragEntered: function(drag, evt) {
    // var sex = drag.get('source').get('selection').get('firstObject').get('sex');
    //    if (this.get('allowDrop') && sex === this.get('sex')){
      this.$().addClass('drop-target') ;
    // }
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
