// ==========================================================================
// Project:   Geniverse.breedDragonController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse module test ok equals same stop start */

module("Geniverse.breedDragonController");

test("Tests for breeding", function () {
  stop();
  SC.RunLoop.begin();
  var controller = Geniverse.breedDragonController;
  controller.initParentsWhenGWTLoads();
  var momo = function () {
    alert('momo');
    controller.breed();
    start();
  }
  controller.invokeLater(momo, 2000);
  SC.RunLoop.end();
  
  SC.RunLoop.begin();
  
  SC.Logger.log('2222');
  controller.invokeLast(function() {
    SC.Logger.log('3333');    
  var eggs = Geniverse.store.find(Geniverse.EGGS_QUERY);
  equals(eggs.get('length'), 20, "breed() breeds 20 dragons at a time");
  });
  SC.RunLoop.end();
  SC.Logger.log('4444');    
});

