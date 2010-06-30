// ==========================================================================
// Project:   Geniverse - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */
Geniverse.marginSize = 15;

require('views/breed_dragon');

Geniverse.biologicaViewsMainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'tabView'.w(),
    
    tabView: SC.TabView.design({ 
      layout: {top: 30, bottom: 5, left: 5, right: 5 }, 
      items: [ 
        {title: "Breeding view", value: "breedPanel" },
        {title: "Chromosome view", value: "chromosomePanel" }
      ], 
      itemTitleKey: 'title', 
      itemValueKey: 'value', 
      nowShowing: 'breedPanel'
    })
    
  }),
  
  breedPanel: SC.View.design({
    layout: {top: 5, bottom: 5, left: 5, right: 5 },
    childViews: 'title breedView'.w(),
    
    title: SC.LabelView.design({
      layout: {top: 20, height: 25, left: 20, width: 100 },
      controlSize: SC.LARGE_CONTROL_SIZE,
      fontWeight: SC.BOLD_WEIGHT,
      value: "Breeding"
    }),
    
    breedView: Geniverse.BreedDragonView.design({
      layout: {top: 80, left: 20, height: 230, width: 450 },
      initParentsImmediately: YES
    })
    
  }),
  
  chromosomePanel: SC.ButtonView.design({
    layout: {top: 30, bottom: 5, left: 5, right: 5 },
    text: "Chromosome"
  })
  
  
  
});
