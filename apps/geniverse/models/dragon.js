// ==========================================================================
// Project:   Geniverse.Dragon
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Geniverse.Dragon = SC.Record.extend(
/** @scope Geniverse.Dragon.prototype */ {
	gOrganism: null,
  name: 'No name',
	sex: -1,
	alleles: null,
	imageURL: null,
	characteristics: [],
	metaInfo: {},
	
	setAttributes: function() {
		var gOrg = this.get('gOrganism');
		this.set('name', gOrg.name);
		this.set('sex', gOrg.sex);
		this.set('alleles', gOrg.alleles);
		this.set('imageURL', gOrg.imageURL);
		this.set('characteristics', gOrg.characteristics);
		this.set('metaInfo', gOrg.metaInfo);
	}.observes('*gOrganism')
}) ;
