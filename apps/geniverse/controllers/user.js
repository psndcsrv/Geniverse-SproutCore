// ==========================================================================
// Project:   Geniverse.userController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse SHA_1_sha1Hash SHA256 */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.userController = SC.ObjectController.create(
/** @scope Geniverse.userController.prototype */ {

  // TODO: Add your own code here.
  usernameBinding: '*user.username',
  
  createUser: function (username, password){
    if (!password){
      password = "";
    }
    
    var passwordHash = SHA256(password);
    
    var user = Geniverse.store.createRecord(Geniverse.User, 
      {
        username: username,
        
        passwordHash: passwordHash
      });
    this.set('content', user);
    return user;
  },
  
  findUser: function (username, callback) {
    var query = SC.Query.local(Geniverse.User, {conditions: 'username = "' + username + '"'});
    var users = Geniverse.store.find(query);

    var usersReady = null;
    
    usersReady = function() {
      var status = users.get('status');
      if (status & SC.Record.READY == SC.Record.READY) {
  	    SC.Logger.info("User query ready. Checking password.");
  		  var user = users.firstObject();
  		  users.removeObserver('status', usersReady);
  		  callback(user);
  	  } else {
  	    SC.Logger.info("User query still not ready. Status is: " + status);
  	  }
    };

    if (users.get('status') & SC.Record.READY == SC.Record.READY){
      usersReady();
    } else {
      users.addObserver('status', usersReady);
    }
  }

}) ;
