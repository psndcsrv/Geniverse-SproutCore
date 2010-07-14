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

  initialAlleles: SC.Record.attr(Object),    // An array of alleles, one for each room. 
                                            // e.g. [{m: 'a:h,b:h', f: 'a:h,b:h'}, {m: 'a:H,b:H', f: 'a:H,b:H'}]
  
  sendBredDragons: SC.Record.attr(Boolean, { defaultValue: NO })
}) ;

Geniverse.Activity.modelName = "activity";
Geniverse.Activity.modelsName = "activities";

