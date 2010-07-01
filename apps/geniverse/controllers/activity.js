// ==========================================================================
// Project:   Geniverse.activityController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CcChat GenGWT */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.activityController = SC.ObjectController.create(
/** @scope Geniverse.activityController.prototype */ {
  
  activity: null,
  
  initialAlleles: function() { 
    if (this.get('activity') !== null){
      return this.get('activity').get('initialAlleles');
    }
    
    return {};
  }.property('activity').cacheable(),
  
  sendBredDragons: function() {
    if (this.get('activity') !== null){
      return this.get('activity').get('sendBredDragons');
    }
    
    return false;
  }.property('activity').cacheable(),
  
  baseChannelName: function() {
    if (this.get('activity') !== null){
      return this.get('activity').get('baseChannelName');
    }
    
    return "";
  }.property('activity').cacheable(),
  
  maxUsersInRoom: function() {
    if (this.get('activity') !== null){
      return this.get('activity').get('maxUsersInRoom');
    }
    
    return 10000;
  }.property('activity').cacheable(),
  
  startActivity: function() {
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
