// ==========================================================================
// Project:   Geniverse.infoPanelController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.infoPanelController = SC.ObjectController.create(
/** @scope Geniverse.infoPanelController.prototype */ {
  pane: null,
  
  // TODO: Add your own code here.
  showInstructions: function() {
    SC.Logger.log("show");
    var pane = SC.PanelPane.create({
      layout: { width: 600, height: 400, centerX: 0, centerY: 0 },
      contentView: SC.View.extend({
        layout: { top: 0, left: 0, bottom: 0, right: 0 },
        childViews: 'labelView buttonView'.w(),

        labelView: SC.LabelView.extend({
          layout: { top: 20, height: 360, left: 20, right: 20 },
          textAlign: SC.ALIGN_LEFT,
          escapeHTML: NO,
          value: Geniverse.infoPanelController.instructions
        }),
        
        buttonView: SC.ButtonView.extend({
          layout: { width: 80, bottom: 20, height: 24, centerX: 0 },
          title: "Hide",
          action: "remove",
          target: "Geniverse.infoPanelController.pane"
        })
      })
    });
    pane.append();
    this.set('pane', pane);
  },
  
  instructions: '<h2>Instructions</h2><p><b>Get started</b> by breeding dragons: click the Breed button below Mother and Father. \
   Note that the progeny appear in a list below the button.</p> \
   <p><b>Chat about your findings with the dragons</b> with other logged in users by typing into the blank above \
    the Chat button and then sending the text to the group by clicking "Chat". </p> \
    <p><b>Send a dragon to other users</b> by selecting one of the progeny (listed below the breeding area) and click \
     "Send selected dragon". This places the dragon in the chat line - then enter text, and click "Chat" to send both.</p> \
     <p><b>Write a paper with others in your group</b> using the "Your Paper/ Published Papers" interface in the \
     upper right corner of the page.</p>\
     <p>Note - to simulate others in the group, you can open a different browser program (that is, if you are \
       using Firefox, open Internet Explorer) and log in under a different name.</p>'
}) ;
