var searchTerm = 'web+developer';
var state = 'CA';
var pageStart = 0;
var totalResults = 0;


function url(searchTerm, state, pageStart) {
  return 'http://api.indeed.com/ads/apisearch?publisher=8829908049153205&format=json&q=title%3A%28' + searchTerm + '%29&l=' + state + '&limit=25&start=' + pageStart + '&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2';
}

var refreshButton = document.querySelector('.refresh');

var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
var startupRequestStream1 = Rx.Observable.of(url(searchTerm, state, pageStart));

var requestOnRefreshStream = refreshClickStream
  .map(ev => {
    // randomOffset = Math.floor(Math.random() * (totalResults / 25));
    return url(searchTerm, state, randomOffset);
  });

var responseStream1 = startupRequestStream1.merge(refreshClickStream)
  .flatMap(requestUrl => 
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  );

function createBaseResponseStream(responseStream1) {
  return responseStream1.map(response => response);
}

function createRandomJobStream(responseStream1) {
  return responseStream1.map(response =>
    response.results[Math.floor(Math.random()*response.results.length)]
  )
  .startWith(null)
  .merge(refreshClickStream.map(ev => null));
}

var baseResponseStream = createBaseResponseStream(responseStream1);

var randomJob1Stream = createRandomJobStream(responseStream1);
var randomJob2Stream = createRandomJobStream(responseStream1);
var randomJob3Stream = createRandomJobStream(responseStream1);
var randomJob4Stream = createRandomJobStream(responseStream1);
var randomJob5Stream = createRandomJobStream(responseStream1);
var randomJob6Stream = createRandomJobStream(responseStream1);

baseResponseStream.subscribe(response => {
  totalResults = response.totalResults;
  console.log(response.totalResults); 
});

randomJob1Stream.subscribe(response => renderSuggestion(response, '.job1'));
randomJob2Stream.subscribe(response => renderSuggestion(response, '.job2'));
randomJob3Stream.subscribe(response => renderSuggestion(response, '.job3'));
randomJob4Stream.subscribe(response => renderSuggestion(response, '.job4'));
randomJob5Stream.subscribe(response => renderSuggestion(response, '.job5'));
randomJob6Stream.subscribe(response => renderSuggestion(response, '.job6'));

function renderSuggestion(response, selector) {
  var tableRow = document.querySelector(selector);
  if (response === null) {
    tableRow.style.visibility = 'hidden';
  } else {
    tableRow.style.visibility = 'visible';
    tableRow.querySelector('a').textContent = response.company;
    tableRow.querySelector('a').href = response.url;
    tableRow.querySelector('.city').textContent = response.city;
    tableRow.querySelector('.company').textContent = response.jobtitle;
    tableRow.querySelector('.snippet').textContent = response.snippet;
  }
}

