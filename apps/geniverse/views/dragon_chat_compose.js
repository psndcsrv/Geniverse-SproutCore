// ==========================================================================
// Project:   Geniverse.DragonChatComposeView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CcChat*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Geniverse.DragonChatComposeView = SC.View.extend(
/** @scope Geniverse.DragonChatComposeView.prototype */ {  
  
  isDropTarget: YES,

  childViews: 'chatComposeView'.w(),
  
  chatComposeView: CcChat.ChatComposeView.design({
    layout: {top: 0, left: 0, bottom: 0, right: 0}
  }),
  
  acceptDragOperation: function(drag, op) {
    var dragon = this._getSourceDragon(drag);
    Geniverse.dragonChattingController.chatDragon(dragon);
    return op ;
  },

  computeDragOperations: function(drag, evt) {
    return SC.DRAG_ANY ;
  },

  dragEntered: function(drag, evt) {
    this.$().addClass('drop-target') ;
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
