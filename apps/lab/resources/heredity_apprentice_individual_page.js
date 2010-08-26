// ==========================================================================
// Project:   Lab.heredityApprenticeIndividualPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Lab */

// This page describes a part of the interface for your application.
Lab.heredityApprenticeIndividualPage = SC.Page.design({

  // Add your views here.  Ex:
  
  mainPane: SC.MainPane.design({
    childViews: 'labelView'.w(),
    
    labelView: SC.LabelView.design({
      layout: { centerX: 0, centerY: 0, width: 200, height: 18 },
      textAlign: SC.ALIGN_CENTER,
      tagName: "h1", 
      value: "Heredity Individual Page (Apprentice)"
    })
  })

});
