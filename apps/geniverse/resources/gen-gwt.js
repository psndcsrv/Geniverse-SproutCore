GenGWT = {

    // 'callback' should be a function that takes a dragon (GOrganism)
    generateDragon: function(callback) {
        generateDragonWithCallback(callback, this.failure);
    },

    generateDragonWithSex: function(sex, callback) {
        generateDragonWithSex(sex, callback, this.failure);
    },

    generateDragonWithAlleleString: function(alleles, callback) {
        generateDragonWithAlleleString(alleles, callback, this.failure);
    },

    generateDragonWithAlleleStringAndSex: function(alleles, sex, callback) {
        generateDragonWithAlleleStringAndSex(alleles, sex, callback, this.failure);
    },

    breedDragon: function(mother, father, callback) {
        breedDragon(mother, father, callback, this.failure);
    },

    isAlive: function(dragon) {
        return this.hasCharacteristic(dragon, "Alive");
    },

    setAlleles: function(string) {
        var allelesArray = string.split("|");
        if (allelesArray.length == 1) {
            this.currentAlleleStringF = allelesArray[0];
            this.currentAlleleStringM = allelesArray[0];
        } else if (allelesArray.length == 2) {
            this.currentAlleleStringF = allelesArray[0];
            this.currentAlleleStringM = allelesArray[1];
        }
    },

    currentAlleleStringM: "",

    currentAlleleStringF: "",

    hasCharacteristic: function(dragon, characteristic) {
        function contains(arrayList, obj) {
            var array = arrayList.array;
            var i = array.length;
            while (i--) {
                if (array[i] == obj) {
                    return true;
                }
            }
            return false;
        }

        return contains(dragon.characteristics, characteristic);
    },

    createDragon: function(jsonDragon) {
        return createGOrganismFromJSONString(JSON.stringify(jsonDragon));
    },

    getCharacteristics: function(dragon, callback) {
        getDragonCharacteristics(dragon, callback, this.failure);
    },

    failure: function(errorMsg) {
        SC.Logger.error("failure on GWT callback");
        SC.Logger.error(errorMsg);
        SC.Logger.trace();
    },

    isLoaded: function() {
      SC.Logger.log("Checking if loaded. Is:  " + (typeof(generateDragonWithCallback) != "undefined"));
	    return (typeof(generateDragonWithCallback) != "undefined");
		}
};