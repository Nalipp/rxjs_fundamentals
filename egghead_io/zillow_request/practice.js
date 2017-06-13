var parser = require('xml2json');
var Rx = require('rxjs');
var jQuery = require('jquery');

// var requestStream = Rx.Observable.of('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1f1u65vu4gb_aroxz&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA');

 var requestStream = Rx.Observable.of('https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21&limit=20&near=-122.395743,37.793662&radius=5mi');

var responseStream = requestStream 
  .flatMap(requestUrl => {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  })

function createSuggestionStream(responseStream) {
  return responseStream.map(getRandomUser)
    .startWith(null)
    .merge(refreshClickStream.map(ev => null))
}

// var xml = "<foo attr=\"value\">bar</foo>";

// var json = parser.toJson(xml);
// console.log("to json -> %s", json);
