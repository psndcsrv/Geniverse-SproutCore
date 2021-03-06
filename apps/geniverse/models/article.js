// ==========================================================================
// Project:   Geniverse.Article
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Geniverse.Article = SC.Record.extend(
/** @scope Geniverse.Article.prototype */ {

  authors: SC.Record.attr(String),
  
  text: SC.Record.attr(String),
  
  time: SC.Record.attr(Number)

}) ;

Geniverse.Article.modelName = "article";
Geniverse.Article.modelsName = "articles";

// TODO enable if we want to use the automated rails backend code to persist changes to activities
// Geniverse.railsBackedTypes.push(Geniverse.Article.modelName);