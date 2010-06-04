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
    return (this.get('isDropTarget') && Geniverse.dragonBinController.get('isEmpty'));
  }.property('Geniverse.dragonBinController.isEmpty'),
  
  addDragonsLabel: SC.LabelView.design({
    layout: {left: 5, top: 0, right: 5, bottom: 0},
    value: "Drag dragons here to attach them as evidence",
    isVisibleBinding: '*parentView.showAddDragonsLabel'
  }),
  
  // dragons: SC.StackedView.design({
  //      contentBinding: 'Geniverse.dragonBinController.arrangedObjects',
  //    //  selectionBinding: 'CcChat.chatListController.selection',
  //      exampleView: Geniverse.OrganismView
  //  }),
  
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
    
    var dragons = Geniverse.dragonBinController.get('dragons');
    
    for (var i = 0; i < dragons.length; i++){
        this.addDragonView(dragons[i], i);
    }
  }.observes('Geniverse.dragonBinController.dragons'),
  
  addDragonView: function(dragon, i) {
    var height = this.get('layout').height;
    var dragonView = Geniverse.OrganismView.create({
      layout: {top: 0, bottom: 0, left: (i * height), width: height},
      organism: dragon,
      backgroundColor: 'white'
    });
    this.appendChild(dragonView);
  },
  
  // drag methods.
	acceptDragOperation: function(drag, op) {
	  var dragon = drag.get('source').get('selection').get('firstObject');
	  var dragons = Geniverse.dragonBinController.get('dragons');
	  dragons.push(dragon);
	  SC.RunLoop.begin();
	  Geniverse.dragonBinController.set('dragons', dragons);
    Geniverse.dragonBinController.propertyDidChange('isEmpty');
    Geniverse.dragonBinController.propertyDidChange('dragons');
    this.propertyDidChange('showAddDragonsLabel');
	  SC.RunLoop.end();
	  
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
  }
});
