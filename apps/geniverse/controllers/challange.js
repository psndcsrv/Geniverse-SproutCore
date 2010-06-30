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
  
  challange: null,
  
  initialAlleles: function() { 
    if (this.get('challange') !== null){
      return this.get('challange').get('initialAlleles');
    }
    
    return {};
  }.property('challange').cacheable(),
  
  sendBredDragons: function() {
    if (this.get('challange') !== null){
      return this.get('challange').get('sendBredDragons');
    }
    
    return false;
  }.property('challange').cacheable(),
  
  baseChannelName: function() {
    if (this.get('challange') !== null){
      return this.get('challange').get('baseChannelName');
    }
    
    return "";
  }.property('challange').cacheable(),
  
  maxUsersInRoom: function() {
    if (this.get('challange') !== null){
      return this.get('challange').get('maxUsersInRoom');
    }
    
    return 10000;
  }.property('challange').cacheable(),
  
  startChallange: function() {
    var chatroom = CcChat.chatRoomController.get('channel');
		Geniverse.breedDragonController.initParentsWhenGWTLoads();
		
    if (this.get('sendBredDragons')){
      CcChat.chatController.subscribeToChannel(chatroom+'/org', this.receiveDragon);
    }
  },
  
  getInitialAlleles: function (sex){
    return this.getInitialAllelesForRoom(CcChat.chatRoomController.get('channelIndex'), sex);
  },
  
  getInitialAllelesForRoom: function (room, sex){
    var alleles = this.get('initialAlleles')[room];
    if (alleles === undefined || alleles === null){
      SC.Logger.log("No alleles for room "+room);
      return "";
    }
    return alleles[sex];
  }
}) ;
