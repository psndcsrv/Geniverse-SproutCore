// ==========================================================================
// Project:   Geniverse.publishedArticlesController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Geniverse.publishedArticlesController =  SC.ArrayController.create(
/** @scope Geniverse.publishedArticlesController.prototype */ {

  articleText: function() {
    var article = this.get('selection').firstObject();
    if (article !== undefined && article !== null){
      return article.get('text');
    } else {
      return "";
    }
  }.property('selection').cacheable(),
  
  dragons: function() {
    var article = this.get('selection').firstObject();
    if (article !== undefined && article !== null){
      return article.get('dragons');
    } else {
      return [];
    }
  }.property('selection').cacheable()

}) ;
