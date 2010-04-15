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
	gOrganism: SC.Record.attr(Object),
  name: SC.Record.attr(String),
	sex: SC.Record.attr(Number),
	alleles: SC.Record.attr(String),
	imageURL: SC.Record.attr(String),
	characteristics: SC.Record.attr(Array),
	metaInfo: SC.Record.attr(Object),
	
	setAttributes: function() {
		var gOrg = this.get('gOrganism');
		this.set('name', gOrg.name);
		this.set('sex', gOrg.sex);
		this.set('alleles', gOrg.alleles);
		this.set('imageURL', gOrg.imageURL);
		this.set('characteristics', gOrg.characteristics);
		this.set('metaInfo', gOrg.metaInfo);
		
		// alert('set organism attributes:' +
		//   ' name: ' + this.get('name') +
		//   ', sex: ' + this.get('sex') +
		//   ', alleles: ' + this.get('alleles') +
		//   ', imageURL: ' + this.get('imageURL') +
		//   ', characteristics: ' + this.get('characteristics') +
		//   ', metaInfo: ' + this.get('metaInfo')
		// );
	}.observes('gOrganism')
}) ;
