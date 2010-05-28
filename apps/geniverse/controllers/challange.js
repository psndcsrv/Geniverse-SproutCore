// ==========================================================================
// Project:   Geniverse.challangeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CcChat GenGWT */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.challangeController = SC.ObjectController.create(
/** @scope Geniverse.challangeController.prototype */ {

  // TODO: Add your own code here.
  initialAlleles: [{m: 'a:h,b:h', f: 'a:h,b:h'}, {m: 'a:H,b:H', f: 'a:H,b:H'}],
  
  sendBredDragons: NO,
  
  startChallange: function() {
    var chatroom = CcChat.chatRoomController.get('channel');
		Geniverse.breedDragonController.initParentsWhenGWTLoads();
		
    if (this.get('sendBredDragons')){
      CcChat.chatController.subscribeToChannel(chatroom+'/org', this.receiveDragon);
    }
  },
  
  doSendBredDragons: function() {
    if (this.get('sendBredDragons')){
      var latestChild = Geniverse.breedDragonController.get('child');
      var message = {dragon: latestChild.get('gOrganism')};
      var orgChannel = CcChat.chatRoomController.get('channel')+'/org';
      CcChat.chatController.post(orgChannel, message);
    }
  }.observes('Geniverse.breedDragonController.child'),
  
  sendDragon: function(dragon){
    var message = {dragon: dragon};
    var orgChannel = CcChat.chatRoomController.get('channel')+'/org';
    SC.Logger.log("sending dragon on "+orgChannel+": "+dragon);
    CcChat.chatController.post(orgChannel, message);
  },
  
  chatDragon: function(){
    var dragon = Geniverse.bredOrganismsController.get('selection').firstObject();
    if (dragon !== undefined && dragon !== null){
      var dragonImageUrl = dragon.get('imageURL');
      var jsonDragon = {dragon: dragon.get('gOrganism'), imageUrl: dragonImageUrl};
      CcChat.chatComposeController.set('item', jsonDragon);
      CcChat.chatComposeController.set('clearButtonTitle', 'Remove Dragon');
    }
    
  },
  
  clearDragon: function() {
    CcChat.chatComposeController.set('item', []);
    this.set('showClearButton', NO);
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
    Geniverse.challangeController.createNewDragonFromChat(message.dragon);
  },
  
  receiveDragonFromChat: function() {
    var latestChat = CcChat.chatController.get('latestChat');
    var item = latestChat.get('item');
    if (item !== null && item.dragon !== undefined && item.dragon !== null){
      this.createNewDragonFromChat(item.dragon);
    }
  }.observes('CcChat.chatController.latestChat'),
  
  createNewDragonFromChat: function(jsonDragon) {
    var dragon = Geniverse.store.createRecord(Geniverse.Dragon, {
      bred: NO, sent: YES
    });
    var gOrg = GenGWT.createDragon(jsonDragon);
    dragon.set('gOrganism', gOrg);
  }
}) ;
