
// var requestStream = Rx.Observable.of('https://poloniex.com/public?command=returnTicker');
// var requestStream = Rx.Observable.of('https://api.github.com/users');

var refreshButton = document.querySelector('.refresh');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var close1Clicks = Rx.Observable.fromEvent(closeButton1, 'click');
var close2Clicks = Rx.Observable.fromEvent(closeButton2, 'click');
var close3Clicks = Rx.Observable.fromEvent(closeButton3, 'click');

var startupRequestStream = Rx.Observable.of('https://api.github.com/users');

var requestOnRefreshStream = refreshClickStream
  .map(ev => {
    var randomOffset = Math.floor(Math.random() * 500);
    return 'https://api.github.com/users?since=' + randomOffset;
});

// flatMap is now an alias for mergeMap 
// but will work just the same.
var responseStream = requestOnRefreshStream.merge(startupRequestStream)
  .flatMap(requestUrl => {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  })
  .publishReplay().refCount(1);

function createSuggestionStream(responseStream) {
  return responseStream.map(listUser => 
    listUser[Math.floor(Math.random()*listUser.length)]
  )
  .startWith(null)
  .merge(refreshClickStream.map(ev => null));
};

var suggestion1Stream = createSuggestionStream(responseStream);
var suggestion2Stream = createSuggestionStream(responseStream);
var suggestion3Stream = createSuggestionStream(responseStream);

function renderSuggestion(userData, selector) {
  var suggestionEl = document.querySelector(selector);
  if (userData === null) {
    suggestionEl.style.visibility = 'hidden';
  } else {
    suggestionEl.style.visibility = 'visible';
    var usernameEl = suggestionEl.querySelector('.username');
    usernameEl.href = userData.html_url;
    usernameEl.textContent = userData.login;
    var imgEl = suggestionEl.querySelector('img');
    imgEl.src = userData.avatar_url ;
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



