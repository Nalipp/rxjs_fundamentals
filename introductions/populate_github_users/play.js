console.log($);

// var requestStream = Rx.Observable.just("https://api.coinbase.com/v2/prices/BTC-USD/spot");  // creating the stream / Observable
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
// var requestStream = Rx.Observable.just('https://api.github.com/users');

requestStream.subscribe(function(requestUrl) {
  // execute the request
  jQuery.getJSON(requestUrl, function(responseData) {
    // ...
  });
});
