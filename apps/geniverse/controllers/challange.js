// ==========================================================================
// Project:   Geniverse.challangeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.challangeController = SC.ObjectController.create(
/** @scope Geniverse.challangeController.prototype */ {

  // TODO: Add your own code here.
  initialAlleles: [{m: 'a:h,b:h', f: 'a:h,b:h'}],
  
  sendBredDragons: YES,
  
  startChallange: function() {
    var chatroom = CcChat.chatRoomController.get('channel');
		CcChat.chatController.subscribeToChannel(chatroom+'/org', this.receiveDragon);
  },
  
  doSendBredDragons: function() {
    if (this.get('sendBredDragons')){
      var latestChild = Geniverse.breedOrganismController.get('latestChild');
        // var mother = Geniverse.breedOrganismController.get('currentMother');
        //          var father = Geniverse.breedOrganismController.get('currentFather');
      var message = {dragon: latestChild};
      var orgChannel = CcChat.chatRoomController.get('channel')+'/org';
      SC.Logger.log("sending dragon on "+orgChannel+": "+latestChild);
      CcChat.chatController.post(orgChannel, message);
    }
  }.observes('Geniverse.breedOrganismController.latestChild'),
  
  sendDragon: function(dragon){
    var message = {dragon: dragon};
    var orgChannel = CcChat.chatRoomController.get('channel')+'/org';
    SC.Logger.log("sending dragon on "+orgChannel+": "+dragon);
    CcChat.chatController.post(orgChannel, message);
  },
  
  getAlleles: function (room, sex){
    var alleles = this.initialAlleles[room];
    if (alleles === undefined || alleles === null){
      SC.Logger.log("No alleles for room "+room);
      return "";
    }
    return alleles[sex];
  },

  receiveDragon: function(message) {
    var dragon = Geniverse.store.createRecord(Geniverse.Dragon, {
      bred: NO, sent: YES
    });
    dragon.set('gOrganism', message.dragon);
  }
}) ;
