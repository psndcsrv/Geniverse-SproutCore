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

      childViews: 'textView editButtonView sendDraftButtonView publishButtonView'.w(),
      
      textView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        layout: { left: 0, top: 0, right: 0, height: 180 },
        contentView: SC.LabelView.design(SC.StaticLayout, {
    		  isEditable: NO,
          escapeHTML: NO,
          valueBinding: 'Geniverse.articleController.textAreaValue'
        })
      }),

      editButtonView: SC.ButtonView.design({
        layout: { top: 190, height: 24, right: 290, width: 110 },
        title:  "Edit paper",
        target: 'Geniverse.articleController',
        action: 'editAction'
      }),
      
      sendDraftButtonView: SC.ButtonView.design({
        layout: { top: 190, height: 24, right: 140, width: 140 },
        title:  "Send draft to team",
        target: 'Geniverse.articleController',
        action: 'sendDraftAction',
        isEnabledBinding: 'Geniverse.articleController.isDraftDirty'
      }),
      
      publishButtonView: SC.ButtonView.design({
        layout: { top: 190, height: 24, right: 10, width: 120 },
        title:  "Publish paper",
        target: 'Geniverse.articleController',
        action: 'publishAction',
        isEnabledBinding: 'Geniverse.articleController.isDraftChanged'
      }),
      
      isVisibleBinding: 'Geniverse.articleController.isStaticVisible'
    }),
    
    editingView: SC.View.extend(SC.StaticLayout, {

      childViews: 'inputView previewView'.w(),

      inputView: SC.TextFieldView.design({
        layout: {left: 0, top: 0, right: 0, height: 180 },
        isTextArea: YES,
        valueBinding: 'Geniverse.articleController.textAreaValue'
    	}),

      previewView: SC.ButtonView.design({
        layout: { top: 190, height: 24, right: 20, width: 120 },
        title:  "Preview paper",
        target: 'Geniverse.articleController',
        action: 'previewDraftAction'
      }),
      
      isVisibleBinding: 'Geniverse.articleController.isEditingVisible'
    })
  
	
  
});
