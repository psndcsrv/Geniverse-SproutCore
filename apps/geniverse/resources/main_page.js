// ==========================================================================
// Project:   Geniverse - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

// This page describes the main user interface for your application.  
Geniverse.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'breedView'.w(),
    
    breedView: Geniverse.BreedDragonView.design({
      layout: { centerX: 0, centerY: 0, width: 205, height: 255 }
    })
  })

});
