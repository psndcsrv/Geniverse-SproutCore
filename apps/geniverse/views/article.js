// ==========================================================================
// Project:   Geniverse.ArticleView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Geniverse.ArticleView = SC.View.extend(SC.StaticLayout,
/** @scope Geniverse.ArticleView.prototype */ {
  
  childViews: 'inputView publishView'.w(),
	
  inputView: SC.View.design(SC.StaticLayout, {
    layout: {left: 0, top: 0, right: 0, height: 80 },
		useStaticLayout: YES,
		childViews: 'textFieldView'.w(),
    textFieldView: SC.TextFieldView.design({
      isTextArea: YES,
      valueBinding: "Geniverse.articleController.textAreaValue"
		})
	}),
	
  publishView: SC.ButtonView.design({
    layout: { top: 90, height: 24, right: 20, width: 120 },
    title:  "Publish article",
    target: 'Geniverse.articleController',
    action: 'sendAction'
  })
});
