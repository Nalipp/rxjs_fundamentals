var query1 = "javascript";
var query2 = "node";
var query3 = "rails";
var query4 = "sql";

var url1 = 'http://api.indeed.com/ads/apisearch?publisher=8829908049153205&format=json&q=title%3A' + query1 + '&limit=2&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2'
var url2 = 'http://api.indeed.com/ads/apisearch?publisher=8829908049153205&format=json&q=title%3A' + query2 + '&limit=2&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2'
var url3 = 'http://api.indeed.com/ads/apisearch?publisher=8829908049153205&format=json&q=title%3A' + query3 + '&limit=2&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2'
var url4 = 'http://api.indeed.com/ads/apisearch?publisher=8829908049153205&format=json&q=title%3A' + query4 + '&limit=2&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2'


var requestStream1 = Rx.Observable.of(url1);
var requestStream2 = Rx.Observable.of(url2);
var requestStream3 = Rx.Observable.of(url3);
var requestStream4 = Rx.Observable.of(url4);

// flatMap is now an alias for mergeMap 
// but will work just the same.
var responseStream = requestStream1.merge(requestStream2).merge(requestStream3).merge(requestStream4)
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
    .map(job => job.results)
  ).concatAll();

responseStream.subscribe(response => {
  console.log(response);
});

Array.prototype.concatAll = function() {
  var results = [];
  
  this.forEach(function(subArray) {
    subArray.forEach(function(item) {
      results.push(item);
    });
  });
  return results;
};

