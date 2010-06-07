// ==========================================================================
// Project:   Geniverse.PublishedArticlesView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse CC*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Geniverse.PublishedArticlesView = SC.View.extend(
/** @scope Geniverse.PublishedArticles.prototype */ {

  childViews: 'list textView dragonBinView'.w(),
  
  list: CC.AutoScrollView.design({
	  hasHorizontalScroller: NO,
    layout: { left: 0, top: 0, height: 190, width: 100 },
    backgroundColor: 'white',
    contentView: SC.ListView.design({
			contentBinding: 'Geniverse.publishedArticlesController.arrangedObjects',
			selectionBinding: 'Geniverse.publishedArticlesController.selection',
			rowHeight: 30,
			canEditContent: NO,
			hasContentIcon: NO,
			contentValueKey: 'authors',
			isSelectable: YES,
			showAlternatingRows: YES
    }),
    autoScrollTriggerBinding:  'Geniverse.publishedArticlesController.length'
  }),
  
  textView: SC.ScrollView.design({
    hasHorizontalScroller: NO,
    layout: { left: 110, top: 0, height: 190, width: 390 },
    contentView: SC.LabelView.design(SC.StaticLayout, {
		  isEditable: NO,
      escapeHTML: NO,
      valueBinding: 'Geniverse.publishedArticlesController.articleText',
      
      checkIfHeightChanged: function() {
        if (Geniverse.articleController.get('isStaticVisible')){
          var timer = SC.Timer.schedule({
    			  target: this,
    			  action: 'changeHeight',
    			  interval: 200,
    			  repeats: NO
    		  });
  		  }
      }.observes('value'),
      
      changeHeight: function() {
        var height = document.getElementById('article').offsetHeight;
        if (height > 0){
          this.adjust('height', height);
        }
      }
      
    })
  }),
  
  dragonBinView: Geniverse.DragonBinView.design({
    layout: { top: 170, height: 40, left: 110, width: 240 },
    isDropTarget: NO,
    dragonsBinding: 'Geniverse.publishedArticlesController.dragons'
  })

});
