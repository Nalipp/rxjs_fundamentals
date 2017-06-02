var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
var close1ClickStream = Rx.Observable.fromEvent(closeButton1, 'click');
var close2ClickStream = Rx.Observable.fromEvent(closeButton2, 'click');
var close3ClickStream = Rx.Observable.fromEvent(closeButton3, 'click');

var requestStream = refreshClickStream.startWith('startup click')
    .map(function() {
        // var randomOffset = Math.floor(Math.random()*5);
        // return 'https://api.github.com/users?since=' + randomOffset;
        // return 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyBg1Af2Yu2AGi-BsoJIKmcAhJJSkGBD9OU'
        // return 'http://www.omdbapi.com/?s=what&apikey=thewdb';
        // return "https://api.coinbase.com/v2/prices/BTC-USD/spot";
        // https://poloniex.com/public?command=returnTicker
    });

console.log('requestStream : ');
console.log(requestStream);

var responseStream = requestStream
    .flatMap(function (requestUrl) {
        console.log($.getJSON(requestUrl.Search));
        return Rx.Observable.fromPromise($.getJSON(requestUrl));
    });

console.log('responseStream : ')
console.log(responseStream);

function createSuggestionStream(closeClickStream) {
    return closeClickStream.startWith('startup click')
        .combineLatest(responseStream,             
            function(click, listUsers) {
                return listUsers[Math.floor(Math.random()*listUsers.length)];
            }
        )
        .merge(
            refreshClickStream.map(function(){ 
                return null;
            })
        )
        .startWith(null);
}

var suggestion1Stream = createSuggestionStream(close1ClickStream);
var suggestion2Stream = createSuggestionStream(close2ClickStream);
var suggestion3Stream = createSuggestionStream(close3ClickStream);


// Rendering ---------------------------------------------------
function renderSuggestion(suggestedUser, selector) {
    var suggestionEl = document.querySelector(selector);
    if (suggestedUser === null) {
        suggestionEl.style.visibility = 'hidden';
    } else {
        suggestionEl.style.visibility = 'visible';
        var titleEl = suggestionEl.querySelector('.username');
        console.log('!!!!!!!!!!!!!!!!!j'); 
        console.log(suggestedUser);
        // titleEl.textContent = suggestedUser.Title;
        // usernameEl.href = suggestedUser.html_url;
        // usernameEl.textContent = suggestedUser.login;
        // var imgEl = suggestionEl.querySelector('img');
        // imgEl.src = "";
        // imgEl.src = suggestedUser.avatar_url;
    }
}

suggestion1Stream.subscribe(function (suggestedUser) {
    renderSuggestion(suggestedUser, '.suggestion1');
});

suggestion2Stream.subscribe(function (suggestedUser) {
    renderSuggestion(suggestedUser, '.suggestion2');
});

suggestion3Stream.subscribe(function (suggestedUser) {
    renderSuggestion(suggestedUser, '.suggestion3');
});


// curl "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10&key=AIzaSyBg1Af2Yu2AGi-BsoJIKmcAhJJSkGBD9OU"


