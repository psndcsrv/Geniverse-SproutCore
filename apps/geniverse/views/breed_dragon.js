// ==========================================================================
// Project:   Geniverse.BreedDragonView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse, generateDragonWithSex */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
require('controllers/breed_organism');
require('views/organism');
Geniverse.BreedDragonView = SC.View.extend(
/** @scope Geniverse.BreedDragonView.prototype */ {
	init: function() {
		this.set('loadTimer', SC.Timer.schedule({
			target: this,
			action: 'initParents',
			interval: 200,
			repeats: YES
		}));
		sc_super();
	},
	
	initParents: function() {
		if (typeof(generateDragonWithSex) != "undefined") {
			var self = this;
			Geniverse.BreedOrganismController.generateDragon(1, 'Mother', function(dragon) {
				SC.RunLoop.begin();
				self.set('mother', dragon);
				SC.RunLoop.end();
			});
			Geniverse.BreedOrganismController.generateDragon(0, 'Father', function(dragon) {
				SC.RunLoop.begin();
				self.set('father', dragon);
				SC.RunLoop.end();
			});
			this.get('loadTimer').invalidate();
		}
	},
	
	classNames: ['breed-organism-view'],
	
  mother: null,
  father: null,
  child: null,

	childViews: 'fatherView motherView childView fatherLabel motherLabel childLabel breedButtonView'.w(),
	
	fatherView: Geniverse.OrganismView.design({
	  classNames: "fatherView",
	  organismBinding: "*parentView.father"
	}),
	
	fatherLabel: SC.LabelView.design({
		layout: {top: 0, right: 0, width: 40, height: 18},
		classNames: "fatherLabel",
		value: "Father",
		useStaticLayout: YES
	}),
	
	motherView: Geniverse.OrganismView.design({
	  classNames: "motherView",
	  organismBinding: "*parentView.mother"
	}),
	
	motherLabel: SC.LabelView.design({
		layout: {top: 0, left: 0, width: 40, height: 18},
		classNames: "motherLabel",
		value: "Mother",
		useStaticLayout: YES
	}),
	
	childView: Geniverse.OrganismView.design({
	  classNames: "childView",
	  organismBinding: "*parentView.child"
	}),
	
	childLabel: SC.LabelView.design({
		layout: {centerX: 0, centerY: 9, width: 40, height: 18},
		classNames: "childLabel",
		value: "Child",
		useStaticLayout: YES
	}),
	
	breedButtonView: SC.ButtonView.design({
		layout: { centerX: 0, bottom: 0, width: 100, height: 24 },
		action: "this.parentView.buttonAction",
		title: "Breed"
	}),
	
	buttonAction: function(source, event) {
		var self = this;
		this.breedButtonView.set('title', 'Generating...');
		Geniverse.BreedOrganismController.breedOrganism(this.get('mother'), this.get('father'), function handleChild(child) {
			SC.RunLoop.begin();
		  self.set('child', child);
		  self.breedButtonView.set('title', 'Breed');
			SC.RunLoop.end();
	  });
	}
	// 
	// render: function(context, firstTime) {
	// 	this._render_child(context, firstTime, 'breedButtonView', false);
	// 	
	// 	this._render_child(context, firstTime, 'motherLabel', true);
	// 	this._render_child(context, firstTime, 'fatherLabel', true);
	// 	this._render_child(context, firstTime, 'childLabel', true);
	// 	this._render_child(context, firstTime, 'motherView', true);
	// 	this._render_child(context, firstTime, 'fatherView', true);
	// 	this._render_child(context, firstTime, 'childView', true);
	// },
	// 
	// _render_child: function(context, firstTime, childName, stripStyles) {
	// 	var child = this.get(childName);
	// 	var curContext = context.begin(child.get('tagName'));
	// 	child.prepareContext(curContext, firstTime);
	// 	curContext.addClass(child);
	// 	if (stripStyles) {
	// 		curContext.removeStyle('left');
	// 		curContext.removeStyle('right');
	// 		curContext.removeStyle('top');
	// 		curContext.removeStyle('bottom');
	// 	}
	// 	curContext.end();
	// }

});
