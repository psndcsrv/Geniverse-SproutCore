// ==========================================================================
// Project:   Geniverse.loginController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse SHA256*/

/** @class

  This view currently does nothing but set the 'username' property on
  chatController. However, it can be used by other views that want to
  hook into the login process. For instance, if the students start out
  seeing a login field, a controller can be watching the username property
  on chatController and, once it is set, log in and start up the application.

  @extends SC.Object
*/
Geniverse.loginController = SC.ObjectController.create(
/** @scope CcChat.loginController.prototype */ {

  // TODO: Add your own code here.
  
  textAreaValue: null,
  
  username: null,
  
  passwordValue: null,
  
  retypePasswordValue: null,
  
  usernameBinding: 'CcChat.chatController.username',
  
  showRetypeField: NO,
  
  test: 35,
  
  welcomeMessage: function(){
    var username = this.get('username');
    if (username !== undefined && username !== null && username.length > 0){
      return "Welcome " + username;
    } else {
      return "";
    }
  }.property('username'),
  
  login: function (){
    SC.Logger.log("login");
    var username = this.get('textAreaValue');
    var password = this.get('passwordValue');
    var passwordHash = SHA256(password);
    
    var a = [this, 'userGetCallback', passwordHash];
    
    SC.Logger.log("making request");
    var request = SC.Request.getUrl("/rails/users/" + username).header({
      'Accept': 'application/json'
    }).json();
    request.notify.apply(request, a);
    request.send();
    
    this.set('textAreaValue', '');
  },
  
  userGetCallback: function (response, passwordHash){
    if (response.isError){
      alert("No user of that name");
    } else {
      var user = response.get('body').user;
      var username = user.username;
      var rails_password_hash = user.password_hash;
      SC.Logger.log("hash from rails = "+rails_password_hash);
      SC.Logger.log("hash from user = "+passwordHash);
      if (rails_password_hash === passwordHash){
        SC.Logger.log("passwords match!");
        Geniverse.userController.createUser(username);
      } else {
        alert("Passwords do not match");
      }
    }
    SC.Logger.log('I got called back! response = '+response.get('body'));
      SC.Logger.log('I got called back! response = '+response.get('body').user);
    SC.Logger.log("password is "+response.get('body').user.password_hash);
    
    window.foo = response;
    
    
    //Geniverse.userController.createUser(username);
  },
  
  register: function (){
    if (!this.get('showRetypeField')){
      this.set('showRetypeField', YES);
    } else {
      if (this.get('passwordValue') === this.get('retypePasswordValue')){
        var username = this.get('textAreaValue');
      //  alert("Welcome "+username + "!");
      //  Geniverse.userController.createUser(username, this.get('passwordValue'));
        this.createAccount(username, this.get('passwordValue'));
        
      } else {
        alert("The two passwords do not match");
      }
    }
  },
  
  createAccount: function (username, password){
    var passwordHash = SHA256(password);
    
    var a = [this, 'userCreateCallback', passwordHash];
    
    SC.Logger.log("making create request");
    var request = SC.Request.postUrl("/rails/users").header({
      'Accept': 'application/json'
    }).json();
    request.notify.apply(request, a)
    .send({user: {username: username, password_hash: passwordHash}});
    
  },
  
  userCreateCallback: function (response){
    SC.Logger.log("got a response! "+response);
      SC.Logger.log("body =  "+response.get('body'));
    if (response.isError){
      alert("Error on creation");
    }
  }

}) ;
