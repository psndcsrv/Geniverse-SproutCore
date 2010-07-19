// ==========================================================================
// Project:   Geniverse.User
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Geniverse.User = SC.Record.extend(
/** @scope Geniverse.User.prototype */ {

  username: SC.Record.attr(String),
  
  passwordHash: SC.Record.attr(String)

}) ;

Geniverse.User.modelName = "user";
Geniverse.User.modelsName = "users";