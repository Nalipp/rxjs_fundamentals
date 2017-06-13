var unsplash = require('unsplash-api');

var clientId = '5b8cfdfb5af4dc7075151c9e0b27308128bfd625dfe8a49ef20d471b40e3be4a'; //this is required to verify your application's requests 

unsplash.init(clientId);

var pageNumber = 5;
var photoCount = 1;

// unsplash.getPhotos(pageNumber, photoCount, function(error, photos, link) {
//   if (error) {
//     console.log(error) 
//   } else {
//     console.log(photos[0].likes);
//     console.log(photos[0].urls.full);
//     console.log(photos[0].urls.thumb);
//   }
// });

var requestStream1;

unsplash.getPhotos(pageNumber, photoCount, function(error, photos, link) {
  if (error) {
    console.log(error) 
  } else {
    requestStream1 = Rx.Observable.of(photos);
  }
});


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

// var baseResponseStream = createBaseResponseStream(responseStream1);

// var randomJob1Stream = createRandomJobStream(responseStream1);
// var randomJob2Stream = createRandomJobStream(responseStream1);
// var randomJob3Stream = createRandomJobStream(responseStream1);
// var randomJob4Stream = createRandomJobStream(responseStream1);
// var randomJob5Stream = createRandomJobStream(responseStream1);
// var randomJob6Stream = createRandomJobStream(responseStream1);

// baseResponseStream.subscribe(response => {
//   console.log(response.totalResults); 
// });

// function printJob(response) {
//   console.log('**********') 
//   console.log('company     : ', response.company);
//   console.log('city        : ', response.city);
//   console.log('job title   : ', response.jobtitle);
//   console.log('description : ', response.snippet);
//   console.log('url         : ', response.url);
// }

// randomJob1Stream.subscribe(response => printJob(response));
// randomJob2Stream.subscribe(response => printJob(response));
// randomJob3Stream.subscribe(response => printJob(response));
// randomJob4Stream.subscribe(response => printJob(response));
// randomJob5Stream.subscribe(response => printJob(response));
// randomJob6Stream.subscribe(response => printJob(response));

// var refreshButton = document.querySelector('.refresh');

// refreshButton.addEventListener('click', function() { 
// });
