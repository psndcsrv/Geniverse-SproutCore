// ==========================================================================
// Project:   Geniverse.BreedDragonView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse, generateDragonWithSex */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
require('views/organism');
Geniverse.BreedDragonView = SC.View.extend(
/** @scope Geniverse.BreedDragonView.prototype */ {
	
	classNames: ['breed-organism-view'],
	
  motherBinding: 'Geniverse.breedDragonController.mother',

  fatherBinding: 'Geniverse.breedDragonController.father',
  
  childBinding: 'Geniverse.breedDragonController.child',

	childViews: 'fatherView motherView childView fatherLabel motherLabel childLabel breedButtonView'.w(),
	
	initParentsImmediately: YES,
	initParentsImmediatelyBinding: 'Geniverse.breedDragonController.initParentsImmediately',
	
	init: function() {
    if (this.get('initParentsImmediately')){
		  Geniverse.breedDragonController.initParentsWhenGWTLoads();
	  }
		
		sc_super();
	},
	
	fatherView: Geniverse.OrganismView.design({
		layout: {top: 18, right: 0, width: 80, height: 60},
	  classNames: "fatherView",
	  organismBinding: "*parentView.father",
	  parent: "father",
	  sex: 0,
	  allowDrop: YES
	}),
	
	fatherLabel: SC.LabelView.design({
		layout: {top: 0, right: 0, width: 40, height: 18},
		classNames: "fatherLabel",
		allowDrop: YES,
		value: "Father",
		sex: 1
	}),
	
	motherView: Geniverse.OrganismView.design({
		layout: {top: 18, left: 0, width: 80, height: 60},
	  classNames: "motherView",
	  organismBinding: "*parentView.mother",
	  parent: "mother",
	  sex: 1,
	  allowDrop: YES
	}),
	
	motherLabel: SC.LabelView.design({
		layout: {top: 0, left: 0, width: 40, height: 18},
		classNames: "motherLabel",
		value: "Mother"
	}),
	
	childView: Geniverse.OrganismView.design({
		layout: {bottom: 20, centerX: 0, width: 80, height: 60},
	  classNames: "childView",
	  organismBinding: "*parentView.child"
	}),
	
	childLabel: SC.LabelView.design({
		layout: {centerX: 0, centerY: 0, width: 40, height: 18},
		classNames: "childLabel",
		value: "Child"
	}),
	
	breedButtonView: SC.ButtonView.design({
		layout: { centerX: 0, bottom: 0, width: 100, height: 24 },
		target: 'Geniverse.breedDragonController',
		action: "breed",
		titleBinding: 'Geniverse.breedDragonController.breedButtonTitle'
	}),
	
	viewDidResize: function() {
		this._resize_children();
	},
	
	_resize_children: function() {
		var width_ratio = 188/144;
		var height_ratio = 144/188;
		
		var width = this.get('layer').offsetWidth;
		var height = this.get('layer').offsetHeight;
		
		var new_width = width/2;
		var new_height = (height-(24+18+18))/2;
		
		var calc_width = new_height * width_ratio;
		var calc_height = new_width * height_ratio;
		
		var actual_w = new_width;
		var actual_h = calc_height;
		
		if (calc_height > new_height) {
			actual_h = new_height;
			actual_w = calc_width;
		}

		this._adjust_size(this.get('fatherView'), actual_w, actual_h);
		this._adjust_size(this.get('motherView'), actual_w, actual_h);
		this._adjust_size(this.get('childView'), actual_w, actual_h);
	},
	
	_adjust_size: function(view, width, height) {
		view.adjust('width', width);
		view.adjust('height', height);
	}


});
