// ==========================================================================
// Project:   Geniverse.appController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse module test ok equals same stop start */

module("Geniverse.articleController");

// TODO: Replace with real unit test for Geniverse.articleController
test("test conversion of initial alleles to array", function() {
  SC.run(function() {
    var activity = Geniverse.store.createRecord(Geniverse.Activity, 
      {initialAlleles: "[{m: 'a:h,b:h', f: 'a:H,b:H'}, {m: 'a:H,b:h', f: 'a:h,b:H'}]"}
    );
    Geniverse.activityController.set('content', activity);
  });
  
  var array = Geniverse.activityController.get('initialAllelesAsArray');
  
  equals(array.length, 2, "there should be two items in the initial alleles array");
  
  var allelesForRoomOneMale = Geniverse.activityController.getInitialAllelesForRoom(0, 'm');
  var allelesForRoomTwoFemale = Geniverse.activityController.getInitialAllelesForRoom(1, 'f');
  
  
  equals(allelesForRoomOneMale, 'a:h,b:h', "Room one male should be 'a:h,b:h'");
  equals(allelesForRoomTwoFemale, 'a:h,b:H', "Room two female should be 'a:h,b:H'");
});

