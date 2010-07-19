// ==========================================================================
// Project:   Geniverse.userController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse SHA_1_sha1Hash */

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
    
    var passwordHash = SHA_1_sha1Hash(password);
    
    var user = Geniverse.store.createRecord(Geniverse.User, 
      {
        username: username,
        
        passwordHash: passwordHash
      });
    this.set('content', user);
  }

}) ;
