// ==========================================================================
// Project:   Geniverse.chromosomeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse generateDragonWithCallback */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.chromosomeController = SC.ObjectController.create(
/** @scope Geniverse.chromosomeController.prototype */ {
  
  initRandomDragon: function () {
    var self = this;
    
		if (typeof(generateDragonWithCallback) != "undefined") {
		  Geniverse.gwtController.generateRandomDragon(function(dragon) {
		    SC.run(function() {
  		    self.set('content', dragon);
		    });
		  });
		}
  },
  
  // this is a very naive implementation of the alleles for the individual chromosomes.
  // We are just getting the "a:" alleles and the "b:" alleles, and assuming all 'a' alleles
  // are on the same chromosome
  
  // We return an array of the 'a' or 'b' alleles. Each item in the array is an array with the first 
  // item being the allele's value and the second being the alternative value.
  // e.g. [[H, h], [f, F], [a, A]]
  // Eventually, the information about the alternative values will come from Biologica
  getChromosomeAlleles: function(chromosome) {
    if (this.get('content') === null){
      return "...";
    }
    var chromosomes = this.get('content').get('alleles');
    var pattern = new RegExp(chromosome + ':.', 'g'); ///+chromosome+:./g;
    var matches = chromosomes.match(pattern);       // generates an array such as ["a:F", "a:s", "a:t"]
    var aAlleles = [];
    for (var i = 0; i < matches.length; i++){
      var allele = matches[i].split(":")[1];           // gets the allele after the colon
      aAlleles[i] = [allele, this._toOtherCase(allele)];  // store allele and it's opposite value (for now)
    }
    return aAlleles;
  },
  
  _toOtherCase: function (c) {
    return /[a-z]/.test(c) ? c.toUpperCase() : c.toLowerCase();
  }
  
}) ;
