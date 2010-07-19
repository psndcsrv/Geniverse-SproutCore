// ==========================================================================
// Project:   Geniverse.ChromosomeView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Geniverse.ChromosomeView = SC.View.extend(
/** @scope Geniverse.ChromosomeView.prototype */ {

  dragonBinding: 'Geniverse.chromosomeController.content',
  
  initRandomDragon: NO,
  
  showDragon: YES,
  
  showGenerateNewDragon: NO,
  
  init: function() {
    if (this.get('initRandomDragon')){
		  Geniverse.chromosomeController.initRandomDragon();
	  }
		
		sc_super();
	},
  
  childViews: 'dragonView motherLabel fatherLabel chromsomeAView chromsomeBView generateNewDragonButton'.w(),
  
  dragonView: Geniverse.OrganismView.design({
		layout: {top: 18, right: 0, width: 180, height: 150},
	  organismBinding: "*parentView.dragon",
	  allowDrop: YES,
	  isVisibleBinding: "*parentView.showDragon"
	}),
	
	motherLabel: SC.LabelView.design({
		layout: {top: 0, left: 0, width: 100, height: 25},
		value: "From mother"
	}),

  fatherLabel: SC.LabelView.design({
		layout: {top: 0, left: 120, width: 100, height: 25},
		value: "From father"
	}),
	
	chromsomeAView: SC.View.extend({
		layout: {top: 35, left: 0, width: 80, height: 500},
		
		createPullDowns: function (){
		  this.removeAllChildren();
  		var alleles = Geniverse.chromosomeController.get('chromosomeAlleles')['a'];
  		for (var i = 0; i < alleles.length; i++){
        this.get('parentView').addPullDown(this, alleles[i], i);
      }
		}.observes('Geniverse.chromosomeController.alleles')
	}),
	
	chromsomeBView: SC.View.extend({
		layout: {top: 35, left: 120, width: 80, height: 500},
		
		createPullDowns: function (){
		  this.removeAllChildren();
  		var alleles = Geniverse.chromosomeController.get('chromosomeAlleles')['b'];
  		for (var i = 0; i < alleles.length; i++){
        this.get('parentView').addPullDown(this, alleles[i], i);
      }
		}.observes('Geniverse.chromosomeController.alleles')
	}),
	
	generateNewDragonButton: SC.ButtonView.extend({
		layout: {top: 180, right: 0, width: 200, height: 25},
	  title: "Create a new dragon",
	  action: 'Geniverse.chromosomeController.initRandomDragon',
	  isVisibleBinding: "*parentView.showGenerateNewDragon"
	}),
	
	addPullDown: function (view, value, i){
	  var val = value[0];
	  var alt = value[1];
	  var width = view.get('layout').width;
    var dropDownMenuView = SC.SelectView.create({
        layout: { top:(25 * i), left: 0, height: 25, width: 50 },

        // not sure whether these need to be SC.Objects or not. It seems to have no effect.
        items: [ SC.Object.create({ title: val, isEnabled: YES, checkbox: NO }),
          SC.Object.create({ title: alt, isEnabled: YES, checkbox: NO })],

        itemTitleKey: 'title',
        theme: 'square',
        showCheckbox: NO
    });
    
    dropDownMenuView.addObserver('value', this.updateDragon);
    
    view.appendChild(dropDownMenuView);
	},
	
	updateDragon: function (){
	  var chromosomeView = this.get('parentView').get('parentView');
	  var aAlleles = chromosomeView.getAllelesFromViews(chromosomeView.get('chromsomeAView'));
	  var bAlleles = chromosomeView.getAllelesFromViews(chromosomeView.get('chromsomeBView'));
    Geniverse.chromosomeController.updateDragon(aAlleles, bAlleles);
	},
	
	getAllelesFromViews: function (view){
	  var alleles = [];
	  var views = view.get('childViews');
	  for (var i = 0; i < views.length; i++){
	    var val = views[i].get('value');
	    if (!!val){
	      var allele = val.get('title');
	      if (SC.$.inArray(allele, alleles) < 0){
	        alleles.push(allele);
	      }
	    }
    }
    return alleles;
	}

});
