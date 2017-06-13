var Rx = require('rxjs');
var jQuery = require('jquery');
//
// var streamA = Rx.Observable.of(3, 4);
// var streamB = streamA.map(a => a * 10);

// streamB.subscribe(x => console.log(x));

// var request = 'http://api.indeed.com/ads/apisearch?publisher=8829908049153205&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2';

var requestStream = Rx.Observable.of('https://api.github.com/users');

// flatMap is now an alias for mergeMap 
// but will work just the same.
var responseStream = requestStream
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  );

responseStream.subscribe(response => {
  console.log(response);
});



