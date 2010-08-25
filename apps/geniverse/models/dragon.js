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
  user: SC.Record.toOne("Geniverse.User"),
  
  // attributes that don't want to be persisted
  gOrganism: null,
  characteristics: null,
  metaInfo: null,
  isEgg: null,
  
  gOrganismDefined: function() {
    var gOrg = this.get('gOrganism');
    var defined = (gOrg !== null && (typeof gOrg != 'undefined') && (typeof gOrg.alleles != 'undefined')) ? YES : NO;
    SC.Logger.info('gOrganism is defined: ' + defined);
    // SC.Logger.dir(this);
    return defined;
  }.property('gOrganism').cacheable(),
  
  init: function() {
    var self = this;
    this.invokeLast(function() {
      // SC.Logger.group('Dragon init');
      SC.Logger.info('gOrganism: ', typeof self.get('gOrganism'));
      if (self.get('gOrganismDefined') == NO) {
        SC.Logger.info('gOrganism not defined. asking GWT for gOrganism');
        Geniverse.gwtController.generateGOrganismWithAlleles(self.get('alleles'), self.get('sex'), function(gOrg) {
          SC.Logger.info('created gOrg for loaded Dragon');
          self.set('gOrganism', gOrg);
        });
      } else {
        SC.Logger.info('gOrganism already defined. must be a session-generated dragon.');
        // SC.Logger.dir(self);
      }
      // SC.Logger.groupEnd();
    });
  },
  
  setAttributes: function() {
    var gOrg = this.get('gOrganism');
    SC.Logger.info('gOrganism changed: ', typeof gOrg);
    if (this.get('gOrganismDefined')) {
      // this.set('name', gOrg.name);  // GWT doesn't create meaningful names, so no sense in overriding an existing name
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
