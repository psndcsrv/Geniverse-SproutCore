// ==========================================================================
// Project:   Geniverse.userController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.userController = SC.ObjectController.create(
/** @scope Geniverse.userController.prototype */ {

  // TODO: Add your own code here.
  
  createUser: function (username, password){
    if (!password){
      password = "";
    }
    var user = Geniverse.store.createRecord(Geniverse.User, 
      {
        username: username,
        
        passwordHash: password        // for now...
      });
    this.set('content', user);
  }

}) ;
