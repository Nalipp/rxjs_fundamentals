var lat = -122.395743;
var lon = 37.793662;

// var url = 'https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21&limit=20&near=' + lat + ',' + lon + '&radius=5mi';

var requestStream = Rx.Observable.of(url);

var responseStream = requestStream
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  );

responseStream.subscribe(response => {
  console.log(response);
});

    // var randLat = (Math.random() * .01) + lat;
    // var randLon = (Math.random() * .01) + lon;
    // 'https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21&limit=20&near=' + randLat + ',' + randLon + '&radius=5mi';
