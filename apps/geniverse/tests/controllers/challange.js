// ==========================================================================
// Project:   Geniverse.challangeController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse module test ok equals same stop start */

module("Geniverse.challangeController");

// TODO: Replace with real unit test for Geniverse.challangeController
test("test description", function() {
  var maleAlleles = Geniverse.challangeController.getAlleles(0, "m");
  var expected = "a:h,b:h";
  equals(maleAlleles, expected, "maleAlleles should be "+expected);
});

