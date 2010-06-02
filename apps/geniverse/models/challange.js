// ==========================================================================
// Project:   Geniverse.Challange
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Geniverse.Challange = SC.Record.extend(
/** @scope Geniverse.Challange.prototype */ {

  initialAlleles: SC.Record.attr(Object),    // An array of alleles, one for each room. e.g. [{m: 'a:h,b:h', f: 'a:h,b:h'}, {m: 'a:H,b:H', f: 'a:H,b:H'}]
  
  sendBredDragons: SC.Record.attr(Boolean, { defaultValue: NO })
}) ;
