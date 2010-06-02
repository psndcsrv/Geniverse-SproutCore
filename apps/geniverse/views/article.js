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
  
  childViews: 'staticView editingView'.w(),
  
  staticView: SC.View.extend(SC.StaticLayout, {

      childViews: 'textView editView'.w(),
      
      textView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        layout: { left: 0, top: 0, right: 0, height: 150 },
        contentView: SC.LabelView.design(SC.StaticLayout, {
    		  isEditable: NO,
          escapeHTML: NO,
          valueBinding: 'Geniverse.articleController.textAreaValue'
        })
      }),

      editView: SC.ButtonView.design({
        layout: { top: 160, height: 24, right: 20, width: 120 },
        title:  "Edit article",
        target: 'Geniverse.articleController',
        action: 'editAction'
      }),
      
      isVisibleBinding: 'Geniverse.articleController.isStaticVisible'
    }),
    
    editingView: SC.View.extend(SC.StaticLayout, {

      childViews: 'inputView publishView'.w(),

      inputView: SC.TextFieldView.design({
        layout: {left: 0, top: 0, right: 0, height: 150 },
        isTextArea: YES,
        valueBinding: 'Geniverse.articleController.textAreaValue'
    	}),

      publishView: SC.ButtonView.design({
        layout: { top: 160, height: 24, right: 20, width: 120 },
        title:  "Publish article",
        target: 'Geniverse.articleController',
        action: 'publishDraftAction'
      }),
      
      isVisibleBinding: 'Geniverse.articleController.isEditingVisible'
    })
  
	
  
});
