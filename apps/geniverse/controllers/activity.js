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

  startActivity: function() {
    var chatroom = CcChat.chatRoomController.get('channel');
		Geniverse.breedDragonController.initParentsWhenGWTLoads();
		
    if (this.get('sendBredDragons')){
      CcChat.chatController.subscribeToChannel(chatroom+'/org', this.receiveDragon);
    }
  },
  
  // converts a string in the form "[{m: 'a:h,b:h', f: 'a:H,b:H'}, {...}]" into
  // an array of initial alleles for rooms
  initialAllelesAsArray: function(){
    var initialAlleles = this.get('initialAlleles');
    
    // FIXME: JSON.parse(initialAlleles) doesn't work here. Don't know why.
    var initialAllelesAsArray = eval(initialAlleles);
    
    return initialAllelesAsArray;
  }.property("initialAlleles").cacheable(),
  
  getInitialAlleles: function (sex){
    return this.getInitialAllelesForRoom(CcChat.chatRoomController.get('channelIndex'), sex);
  },
  
  getInitialAllelesForRoom: function (room, sex){
    var alleles = this.get('initialAllelesAsArray')[room];
    if (alleles === undefined || alleles === null){
      SC.Logger.log("No alleles for room "+room);
      return "";
    }
    return alleles[sex];
  }
}) ;
