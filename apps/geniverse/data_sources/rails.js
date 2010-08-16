// ==========================================================================
// Project:   Geniverse.RailsDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Geniverse */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
sc_require('models/activity');
Geniverse.ACTIVITIES_QUERY = SC.Query.local(Geniverse.Activity, {
  orderBy: 'title'
});


Geniverse.RailsDataSource = SC.DataSource.extend(
/** @scope Geniverse.RailsDataSource.prototype */ {
  
  _jsonGet: function(url, callback, params){
    // replace the url with 'this'
    // so we can pass the params to notify
    params = SC.A(arguments).slice(1);
    params.unshift(this);
    
    var request = SC.Request.getUrl(url + '.json').header({
      'Accept': 'application/json'
    }).json();
    request.notify.apply(request, params);
    
    SC.Logger.log('request.address: %s', request.address);
    SC.Logger.log('request: ', request);
    request.send();
  },
  
  // ..........................................................
  // QUERY SUPPORT
  //
  fetch: function(store, query) {
    SC.Logger.group('Geniverse.RailsDataSource.fetch()');
    var recordType = query.recordType;
    if (Geniverse.railsBackedTypes.indexOf(recordType.modelName) != -1) {
      SC.Logger.log('rails backed query', query);
      this._jsonGet('/rails/' + recordType.modelsName, 'didFetchRecords', store, query);
      SC.Logger.groupEnd();
      return YES;
    }
    
    // if (query === Geniverse.ACTIVITIES_QUERY) {
    //   SC.Logger.log('query === Geniverse.ACTIVITIES_QUERY', query);
    //   this._jsonGet('/rails/activities', 'didFetchActivities', store, query);
    //   
    //   SC.Logger.groupEnd();
    //   return YES;
    // }

    SC.Logger.log('not a rails backed query', query);
    SC.Logger.groupEnd();
    return NO; // return YES if you handled the query
  },

  didFetchRecords: function(response, store, query) {
    SC.Logger.group('Geniverse.RailsDataSource.didFetchRecords');
    SC.Logger.log('response.status = %d', response.get('status'));
    SC.Logger.log("response: ", response);

    if (SC.ok(response)) {
      SC.Logger.log('SC.ok(response) is YES; processing content');
      var content = response.get('body').content;
      SC.Logger.log('response.body.content: ', content);
      var recordType = query.recordType;
      store.loadRecords(recordType, content);

      store.dataSourceDidFetchQuery(query);
    } else store.dataSourceDidErrorQuery(query, response);

    SC.Logger.groupEnd();
  },

  // ..........................................................
  // RECORD SUPPORT
  //
  retrieveRecord: function(store, storeKey) {
    SC.Logger.log('Geniverse.RailsDataSource.retrieveRecord');
    // guid will be rails url e.g. /rails/questions/1
    var guid = store.idFor(storeKey);
    
    this._jsonGet(guid, 'didRetrieveRecord', store, storeKey);
    
    return YES; // return YES if you handled the storeKey
  },
  
  didRetrieveRecord: function(response, store, storeKey) {
    SC.Logger.group('Geniverse.RailsDataSource.didRetrieveRecord()');

    SC.Logger.log('response.status = %d', response.get('status'));
    SC.Logger.log("response: ", response);

    if (SC.ok(response)) {
      SC.Logger.log('SC.ok(response) is YES; processing content');
      var content = response.get('body').content;
      SC.Logger.log('response.body.content: ', content);

      SC.Logger.group('store.dataSourceDidComplete(storeKey, content)');
      store.dataSourceDidComplete(storeKey, content);
      SC.Logger.groupEnd();
    } else store.dataSourceDidError(storeKey);

    SC.Logger.groupEnd();
  },

  
  createRecord: function(store, storeKey) {
    var recordType = store.recordTypeFor(storeKey);
    if (Geniverse.railsBackedTypes.indexOf(recordType.modelName) != -1) {
      var modelName = recordType.modelName;
      var modelHash = {};
      modelHash[modelName] = store.readDataHash(storeKey);
      SC.Logger.dir(modelHash);
      delete modelHash[modelName]['guid'];    // remove guid property before sending to rails

      SC.Logger.group('Geniverse.RailsDataSource.createRecord()');
      SC.Request.postUrl('/rails/' + recordType.modelsName).header({
                     'Accept': 'application/json'
                 }).json()
           .notify(this, this.didCreateRecord, store, storeKey)
           .send(modelHash);
      SC.Logger.groupEnd();
    }
    return YES;
  },
  
  didCreateRecord: function(response, store, storeKey) {
    if (SC.ok(response)) {
      // Adapted from parseUri 1.2.2
      // (c) Steven Levithan <stevenlevithan.com>
      // MIT License
      var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
      var url = parser.exec(response.header('Location'))[8];
      store.dataSourceDidComplete(storeKey, null, url); // update url

    } else store.dataSourceDidError(storeKey, response);
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
