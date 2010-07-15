// ==========================================================================
// Project:   Geniverse.Activity
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Geniverse.Activity = SC.Record.extend(
/** @scope Geniverse.Activity.prototype */ {
  
  title: SC.Record.attr(String,  { defaultValue: "Geniverse" }),
  
  baseChannelName: SC.Record.attr(String),
  
  maxUsersInRoom: SC.Record.attr(Number,  { defaultValue: 3 }),
  
  // we originally had 'initialAlleles' as an array. To speed up development on Rails, 'initialAlleles'
  // is now a string, and 'initialAllelesAsArray' on the controller converts that string to 
  // an array. Eventually, the Rails back-end should support initialAlleles being an array
  
  initialAlleles: SC.Record.attr(String),   // a string in the form of "[{m: 'a:H,b:H',f: 'a:h,b:h'},{m: 'a:h,b:H',f: 'a:H,b:h'}]"
  
  sendBredDragons: SC.Record.attr(Boolean, { defaultValue: NO })
}) ;

Geniverse.Activity.modelName = "activity";
Geniverse.Activity.modelsName = "activities";

