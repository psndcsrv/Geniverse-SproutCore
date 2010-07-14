// ==========================================================================
// Project:   Geniverse.DragonBundle
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Geniverse.DragonBundle = SC.Record.extend(
/** @scope Geniverse.DragonBundle.prototype */ {
	dragon: null,
	image: "",
	imageURL: "",
	chatHistory: [],
	userHistory: [],
	lastChat: "",
	mother: null,
	father: null
	
}) ;

Geniverse.DragonBundle.modelName = "dragonBundle";
Geniverse.DragonBundle.modelsName = "dragonBundles";
