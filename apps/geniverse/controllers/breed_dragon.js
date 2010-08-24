// ==========================================================================
// Project:   Geniverse.breedDragonController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse generateDragonWithSex*/

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.breedDragonController = SC.Controller.create(
/** @scope Geniverse.breedDragonController.prototype */ {

  latestChild: null,
  
  mother: null,
  
  father: null,
  
  child: null,
  
  loadTimer: null,
  
  breedButtonTitle: 'Breed',
  
  initParentsWhenGWTLoads: function() {
    if (this.get('loadTimer') !== null){
      this.get('loadTimer').invalidate();
    }
    
    this.set('loadTimer', SC.Timer.schedule({
      target: this,
      action: 'initParents',
      interval: 200,
      repeats: YES
    }));
  },
  
  initParents: function() {
    var self = this;
    
    function setMother(dragon){
        SC.RunLoop.begin();
        self.set('mother', dragon);
        SC.RunLoop.end();
    }
    
    function setFather(dragon){
        SC.RunLoop.begin();
        self.set('father', dragon);
        SC.RunLoop.end();
    }
    if (typeof(generateDragonWithSex) != "undefined") {
      SC.Logger.log('found gwt');
      var allelesF = Geniverse.activityController.getInitialAlleles('f');
      if (allelesF !== undefined && allelesF !== null){
        Geniverse.gwtController.generateDragonWithAlleles(allelesF, 1, 'Mother', setMother);
        var allelesM = Geniverse.activityController.getInitialAlleles('m');
        Geniverse.gwtController.generateDragonWithAlleles(allelesM, 0, 'Father', setFather);
      } else {
        Geniverse.gwtController.generateDragon(1, 'Mother', setMother);
        Geniverse.gwtController.generateDragon(0, 'Father', setFather);
      }
      if (this.get('loadTimer') !== null){
        this.get('loadTimer').invalidate();
      }
    }
  },
  
  breed: function() {
    var self = this;
    this.set('breedButtonTitle', 'Generating...');
    Geniverse.eggsController.removeAllEggs(); //clear the breeding pen
    for (var i = 0; i < 20; ++i) {
      Geniverse.gwtController.breedOrganism(this.get('mother'), this.get('father'), function handleChild(child) {
        SC.RunLoop.begin();
        child.set('isEgg', true);
        self.set('child', child);
        if (self.get('breedButtonTitle') !== 'Breed') {
          self.set('breedButtonTitle', 'Breed');
        }
        SC.RunLoop.end();
      });
    }
  }
});
