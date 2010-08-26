// ==========================================================================
// Project:   Geniverse.gwt Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================


/*globals Geniverse module test ok equals same stop start */

module("Geniverse.gwt");

test("basic gwt test", function() {
  Geniverse.gwtController.generateRandomDragon(function (org){
    start();
    ok(true, "We got called back");
  });
  stop(1000);
});
