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
  
  init: function() {
    if (this.get('initRandomDragon')){
		  Geniverse.chromosomeController.initRandomDragon();
	  }
		
		sc_super();
	},
  
  childViews: 'dragonView motherLabel fatherLabel chromsomeAView chromsomeBView'.w(),
  
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
		
		render: function (context, firstTime){
		  var alleles = Geniverse.chromosomeController.getChromosomeAlleles('a');
		  for (var i = 0; i < alleles.length; i++){
        context = context.begin('select');
        for (var j = 0; j < alleles[i].length; j++){
          context = context.begin('option').push(alleles[i][j]).end();
        }
        context = context.end();
      }
		  sc_super();
		},
		
		updateBinding: 'Geniverse.chromosomeController.alleles',
   
		displayProperties: ['update']
	}),
	
	chromsomeBView: SC.View.extend({
		layout: {top: 35, left: 120, width: 80, height: 500},
		
		render: function (context, firstTime){
		  var alleles = Geniverse.chromosomeController.getChromosomeAlleles('b');
		  for (var i = 0; i < alleles.length; i++){
        context = context.begin('select');
        for (var j = 0; j < alleles[i].length; j++){
          context = context.begin('option').push(alleles[i][j]).end();
        }
        context = context.end();
      }
		  sc_super();
		},
		
		updateBinding: 'Geniverse.chromosomeController.alleles',
   
		displayProperties: ['update']
	})

});
