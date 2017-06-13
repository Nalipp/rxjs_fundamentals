var searchTerm = 'ruby on rails';

var state = 'CA';

var url = 'http://api.indeed.com/ads/apisearch?publisher=8829908049153205&format=json&q=title%3A%28' + searchTerm + '%29&l=' + state + '&limit=25&start=0&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2';

var requestStream1 = Rx.Observable.of(url);

var responseStream1 = requestStream1
  .flatMap(requestUrl => 
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  );

function createBaseResponseStream(responseStream1) {
  return responseStream1.map(response => response);
}

function createRandomJobStream(responseStream1) {
  return responseStream1.map(response =>
    response.results[Math.floor(Math.random()*response.results.length)]
  );
}

var baseResponseStream = createBaseResponseStream(responseStream1);

var randomJob1Stream = createRandomJobStream(responseStream1);
var randomJob2Stream = createRandomJobStream(responseStream1);
var randomJob3Stream = createRandomJobStream(responseStream1);
var randomJob4Stream = createRandomJobStream(responseStream1);
var randomJob5Stream = createRandomJobStream(responseStream1);
var randomJob6Stream = createRandomJobStream(responseStream1);

baseResponseStream.subscribe(response => {
  console.log(response.totalResults); 
});

function printJob(response) {
  console.log('**********') 
  console.log('company     : ', response.company);
  console.log('city        : ', response.city);
  console.log('job title   : ', response.jobtitle);
  console.log('description : ', response.snippet);
  console.log('url         : ', response.url);
}

randomJob1Stream.subscribe(response => printJob(response));
randomJob2Stream.subscribe(response => printJob(response));
randomJob3Stream.subscribe(response => printJob(response));
randomJob4Stream.subscribe(response => printJob(response));
randomJob5Stream.subscribe(response => printJob(response));
randomJob6Stream.subscribe(response => printJob(response));

var refreshButton = document.querySelector('.refresh');

refreshButton.addEventListener('click', function() { 
});
