// ==========================================================================
// Project:   Geniverse.eggs
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.eggsController = SC.ArrayController.create(
  SC.CollectionViewDelegate,
/** @scope Geniverse.bredOrganismsController.prototype */ {
    
    removeAllEggs: function () {
      var eggs = Geniverse.store.find(Geniverse.EGGS_QUERY);
      Geniverse.store.destroyRecords(Geniverse.Dragon, eggs.getEach('id'));
    },
    
    collectionViewDeleteContent: function(view, content, indexes) {
      // destroy the records
      var records = indexes.map(function(idx) {
        return this.objectAt(idx);
      }, this);
      records.invoke('destroy');

      var selIndex = indexes.get('min')-1;
      if (selIndex<0) selIndex = 0;
      this.selectObject(this.objectAt(selIndex));
    }
}) ;
