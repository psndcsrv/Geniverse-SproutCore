// ==========================================================================
// you can run these tests directly here:
//
// http://localhost:4020/Geniverse/en/current/tests/models/activity.html
//
// ==========================================================================
/*globals Geniverse module test ok equals same stop start statusEquals statusNotify statusQueue testAfterPropertyChange */

// { setup: store: SC.Store.create().from('Geniverse.RailsDataSource') }

module("Geniverse.RailsDataSource_fetch_and_retrieve", { 
  setup: function() {
    SC.Logger.log("setting store");
    this.store = SC.Store.create().from('Geniverse.RailsDataSource');
    Geniverse.set('store', this.store); 
  }
});

// NOTE: 
test("does the source that core.js associates with Geniverse store exist", function() {
  // setup a spy
  var fetchCalled = false;
  var railsDataSource = this.store._getDataSource();
  SC.Logger.log("railsDataSource = "+railsDataSource);
  // reassign fetch prop to new function
  railsDataSource.fetch = function() {
    fetchCalled = true;
  };
  var activities = Geniverse.store.find(Geniverse.ACTIVITIES_QUERY);
  ok(activities instanceof SC.RecordArray, 'activities should be a SC.RecordArray');
  ok(fetchCalled, 'the fetch method was called which means our Rails datasource is being called');
});

test("do we get activities back from rails", function() {
  var activities = Geniverse.store.find(Geniverse.ACTIVITIES_QUERY);
  statusEquals(activities, SC.Record.BUSY_LOADING, 'Activities should be loading');
  
  statusQueue([
    { target: activities,
      callback: function(){
        statusEquals(activities, SC.Record.READY_CLEAN, "Next state was clean");
        ok(activities.get('length') > 0, 'we should have at least one activity after the activities become "clean"');
      }      
    }
  ]);
});
// 
// test("does the first activity returned have questions", function() {
//   var activities = Geniverse.store.find(Geniverse.ACTIVITIES_QUERY);
//   
//   statusQueue([
//     { target: activities,
//       callback: function(){
//         var firstActivity = activities.objectAt(0);
//         var questions = firstActivity.get('questions');
//         ok(questions.get('length') > 0, 'we have at least one question');        
//       }
//     }
//   ]);  
// });
// 
// test("verify retrieveRecord is called when first related object is requested", function() {
//   // setup a spy
//    var retrieveCalledFor = null;
//    var railsDataSource = this.store._getDataSource();
//    // reassign fetch prop to new function
//    railsDataSource.retrieveRecord = function(store, storeKey) {
//      retrieveCalledFor = store.recordTypeFor(storeKey);
//    };
//   
//   var activities = Geniverse.store.find(Geniverse.ACTIVITIES_QUERY);
//   
//   statusQueue([
//     { target: activities,
//       callback: function(){
//         var firstActivity = activities.objectAt(0);
//         var questions = firstActivity.get('questions');
//       
//         SC.RunLoop.begin();
//         SC.RunLoop.end();
//         equals(retrieveCalledFor, null, "retrieve should still not have been called on the questions");
//       
//         var firstQuestion = questions.objectAt(0);
//       
//         equals(retrieveCalledFor, Geniverse.Question, "retrieve should have been called when we ask for the first question, before the run loop");
//       }
//     }
//   ]); 
// });
// 
// test("does retrieveRecord work for questions", function() {
//   var question = Geniverse.store.find(Geniverse.Question, '/rails/questions/1');
//   ok(question !==  null, "question should not be null");
//   
//   statusQueue([
//     { target: question,
//       callback: function(){
//           statusEquals(question, SC.Record.READY_CLEAN, "question's status is READY_CLEAN");
// 
//           var prompt = question.get('prompt');
//           ok(prompt !== null, 'The first question has a prompt: '+prompt);
//       }
//     }
//   ]);
// });
// 
// 
// test("does the first activity returned have valid questions with prompts", function () {
// 
//   var activities = Geniverse.store.find(Geniverse.ACTIVITIES_QUERY);
//   var firstQuestion;
//   
//   testAfterPropertyChange(activities, 'status', function () {        
//     statusEquals(activities, SC.Record.READY_CLEAN, "activities's status is READY_CLEAN");
// 
//     var firstActivity = activities.objectAt(0);
//     ok(firstActivity !== null, "We have a first activity");
// 
//     var questions = firstActivity.get('questions');
//     ok(questions.get('length') > 0, "We have questions");
// 
//     firstQuestion = questions.objectAt(0);
//     ok(firstQuestion, "We have a firstQuestion");
//     
//     testAfterPropertyChange(firstQuestion, 'status', function () {
//       statusEquals(firstQuestion, SC.Record.READY_CLEAN, "question's status is READY_CLEAN");
//       ok(firstQuestion.get('prompt'), "first question has a valid prompt");
//     });
//   });
// });
