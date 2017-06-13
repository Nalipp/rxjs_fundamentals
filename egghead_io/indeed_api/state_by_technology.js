var endpoingArr = [];

var searchTerm = 'sql';
var state = 'CO'

var url = 'http://api.indeed.com/ads/apisearch?publisher=8829908049153205&format=json&q=title%3A%28' + searchTerm + '%29&l=' + state + '&limit=25&start=0&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2';

var requestStream = Rx.Observable.of(url);

var responseStream = requestStream
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
    .map(x => x)
  );

responseStream.subscribe(response => {
  console.log(response);
});
