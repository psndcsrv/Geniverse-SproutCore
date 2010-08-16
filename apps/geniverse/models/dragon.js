// ==========================================================================
// Project:   Geniverse.Dragon
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse GenGWT */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Geniverse.Dragon = SC.Record.extend(
/** @scope Geniverse.Dragon.prototype */ {
  
  // All the attributes that we want to be sure to persist
  name: SC.Record.attr(String),
	sex: SC.Record.attr(Number),
	alleles: SC.Record.attr(String),
	imageURL: SC.Record.attr(String),
	mother: SC.Record.toOne("Geniverse.Dragon"),
	father: SC.Record.toOne("Geniverse.Dragon"),
	bred: SC.Record.attr(Boolean),
	
	// attributes that don't need to be persisted
	gOrganism: null,
	characteristics: null,
	metaInfo: null,
	
	setAttributes: function() {
		var gOrg = this.get('gOrganism');
		if (gOrg !== null && (typeof gOrg.sex !== "undefined")) {
  		this.set('name', gOrg.name);
  		this.set('sex', gOrg.sex);
  		this.set('alleles', gOrg.alleles);
  		this.set('imageURL', gOrg.imageURL);
  		if (gOrg.characteristics !== null){
  		  this.set('characteristics', gOrg.characteristics.array);
  	  } else {
  	    var self = this;
  	    GenGWT.getCharacteristics(gOrg, function(characteristics){
  	      gOrg.characteristics = characteristics;
  	      self.set('characteristics', gOrg.characteristics.array);
  	    });
  	  }
  		this.set('metaInfo', gOrg.metaInfo);
  	}
	}.observes('gOrganism'),
	
	// some computed properties
	sexAsString: function() {
		var sex = this.get('sex');
		if (sex === 0) {
			return "Male";
		} else if (sex === 1) {
			return "Female";
		} else if (sex === -1) {
			return "Random";
		} else {
			return "Unknown";
		}
	}.property('sex').cacheable(),
	
	characteristicsAsString: function() {
		var out = '';
		var chars = this.get('characteristics');
		for (var i = 0; i < chars.length; i++) {
			if (i === 0) {
				out += chars[i];
			} else {
				out += ", " + chars[i];
			}
		}
		return out;
	}.property('characteristics').cacheable(),
	
	info: function() {
		return this.get('sexAsString') + ' -- ' + this.get('characteristicsAsString');
	}.property('sexAsString','characteristicsAsString').cacheable()
}) ;

Geniverse.Dragon.modelName = "dragon";
Geniverse.Dragon.modelsName = "dragons";

Geniverse.railsBackedTypes.push(Geniverse.Dragon.modelName);
