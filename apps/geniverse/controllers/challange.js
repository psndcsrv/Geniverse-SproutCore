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
  initialAlleles: [{m: 'a:h,b:h', f: 'a:h,b:h'}, {m: 'a:H,b:H', f: 'a:H,b:H'}],
  
  sendBredDragons: YES,
  
  startChallange: function() {
    SC.Logger.log("starting challange");
    var chatroom = CcChat.chatRoomController.get('channel');
		CcChat.chatController.subscribeToChannel(chatroom+'/org', this.receiveDragon);
		Geniverse.breedDragonController.initParentsWhenGWTLoads();
  },
  
  doSendBredDragons: function() {
    if (this.get('sendBredDragons')){
      var latestChild = Geniverse.breedDragonController.get('child');
      var message = {dragon: latestChild.get('gOrganism')};
      var orgChannel = CcChat.chatRoomController.get('channel')+'/org';
      SC.Logger.log("sending dragon on "+orgChannel+": "+latestChild.get('gOrganism'));
      CcChat.chatController.post(orgChannel, message);
    }
  }.observes('Geniverse.breedDragonController.child'),
  
  sendDragon: function(dragon){
    var message = {dragon: dragon};
    var orgChannel = CcChat.chatRoomController.get('channel')+'/org';
    SC.Logger.log("sending dragon on "+orgChannel+": "+dragon);
    CcChat.chatController.post(orgChannel, message);
  },
  
  getInitialAlleles: function (sex){
    return this.getInitialAllelesForRoom(CcChat.chatRoomController.get('channelIndex'), sex);
  },
  
  getInitialAllelesForRoom: function (room, sex){
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
