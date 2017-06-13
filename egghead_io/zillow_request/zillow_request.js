
// var requestStream = Rx.Observable.of('https://poloniex.com/public?command=returnTicker');
// var requestStream = Rx.Observable.of('https://api.github.com/users');

var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
var close1Clicks = Rx.Observable.fromEvent(closeButton1, 'click');
var close2Clicks = Rx.Observable.fromEvent(closeButton2, 'click');
var close3Clicks = Rx.Observable.fromEvent(closeButton3, 'click');

var lat = -122.395743;
var lon = 37.793662;

var startupRequestStream = Rx.Observable.of('https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21&limit=20&near=' + lat + ',' + lon + '&radius=5mi');

var requestOnRefreshStream = refreshClickStream
  .map(ev => {
    var randLat = (Math.random() * .01) + lat;
    var randLon = (Math.random() * .01) + lon;
    return 'https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21&limit=20&near=' + randLat + ',' + randLon + '&radius=5mi';
});

var requestStream = startupRequestStream.merge(requestOnRefreshStream);

var responseStream = requestStream 
  .flatMap(requestUrl => {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  })
  .publishReplay().refCount(1);

function getRandomUser(listUsers) {
  return listUsers[Math.floor(Math.random() * listUsers.length)];
}

function createSuggestionStream(responseStream, closeClickStream) {
  return responseStream.map(getRandomUser)
    .startWith(null)
    .merge(refreshClickStream.map(ev => null))
    .merge(
      closeClickStream.withLatestFrom(responseStream, (x, R) => getRandomUser(R))
    );
}

var suggestion1Stream = createSuggestionStream(responseStream, close1Clicks);
var suggestion2Stream = createSuggestionStream(responseStream, close2Clicks);
var suggestion3Stream = createSuggestionStream(responseStream, close3Clicks);

function renderSuggestion(userData, selector) {
  var suggestionEl = document.querySelector(selector);
  if (userData === null) {
    suggestionEl.style.visibility = 'hidden';
  } else {
    suggestionEl.style.visibility = 'visible';
    var usernameEl = suggestionEl.querySelector('.username');
    // usernameEl.href = userData.html_url;
    usernameEl.textContent = userData.city;
    // var imgEl = suggestionEl.querySelector('img');
    // imgEl.src = userData.avatar_url ;
  }
}

suggestion1Stream.subscribe(user =>  {
  renderSuggestion(user, '.suggestion1');
});

suggestion2Stream.subscribe(user =>  {
  renderSuggestion(user, '.suggestion2');
});

suggestion3Stream.subscribe(user =>  {
  renderSuggestion(user, '.suggestion3');
});



