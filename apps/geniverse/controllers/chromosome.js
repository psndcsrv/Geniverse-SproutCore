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
  
  chromosomeAlleles: {a: [], b: []},
  
  updateChromosomeAlleles: function (){
    this.chromosomeAlleles['a'] = this.calculateChromosomeAlleles('a');
    this.chromosomeAlleles['b'] = this.calculateChromosomeAlleles('b');
  }.observes('dragon').cacheable(),
  
  // this is a very naive implementation of the alleles for the individual chromosomes.
  // We are just getting the "a:" alleles and the "b:" alleles, and assuming all 'a' alleles
  // are on the same chromosome
  
  // We return an array of the 'a' or 'b' alleles. Each item in the array is an array with the first 
  // item being the allele's value and the second being the alternative value.
  // e.g. [[H, h], [f, F], [a, A]]
  // Eventually, the information about the alternative values will come from Biologica
  calculateChromosomeAlleles: function(chromosome) {
    if (this.get('content') === null){
      return "...";
    }
    var chromosomes = this.get('content').get('alleles');
    var pattern = new RegExp(chromosome + ':.', 'g'); ///+chromosome+:./g;
    var matches = chromosomes.match(pattern);       // generates an array such as ["a:F", "a:s", "a:t"]
    var alleles = [];
    for (var i = 0; i < matches.length; i++){
      var allele = matches[i].split(":")[1];           // gets the allele after the colon
      alleles[i] = [allele, this._toOtherCase(allele)];  // store allele and it's opposite value (for now)
    }
    return alleles;
  },
  
  _toOtherCase: function (c) {
    return /[a-z]/.test(c) ? c.toUpperCase() : c.toLowerCase();
  },
  
  updateDragon: function (aAlleles, bAlleles){
    if (!this._allelesEqual(aAlleles,this.chromosomeAlleles['a']) || !this._allelesEqual(bAlleles, this.chromosomeAlleles['b'])){
      // create a new allele string
      var alleleString = "";
      for (var i = 0; i < aAlleles.length; i++){
        alleleString += "a:"+aAlleles[i] + ",";
        if (!!bAlleles[i]){
          alleleString += "b:"+bAlleles[i] + ",";
        }
      }
      // rm last comma
      alleleString = alleleString.substring(0,alleleString.length-1);
      
      var self = this;
      Geniverse.gwtController.generateDragonWithAlleles(alleleString, this.get('sex'), this.get('name'), function(dragon) {
		    SC.run(function() {
  		    self.set('content', dragon);
		    });
		  });
    }
  },
  
  // a little helper method for checking if [a,b] and [[a,A],[b,B]] are equal
  _allelesEqual: function(alleles, expandedAlleles){
    for (var i = 0; i < alleles.length; i++){
      if (alleles[i] !== expandedAlleles[i][0]){
        return false;
      }
    }
    return true;
  }
  
}) ;
