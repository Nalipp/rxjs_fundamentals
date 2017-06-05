var Observable = Rx.Observable;

var button = document.querySelector('button');
var h1 = document.querySelector('h1');

var clickStream = Rx.Observable.fromEvent(button, 'click');

var singleClickStream = clickStream
    .buffer(() => clickStream.throttle(250))
    .map((x) => x.length)
    .filter((x) => x === 1);

var multiClickStream = clickStream
    .buffer(() => clickStream.throttle(250))
    .map((x) => (x.length))
    .filter((x) => x > 1);

singleClickStream.subscribe(event => {
  h1.textContent = 'single clicked';
});


multiClickStream.subscribe(event => {
  var clickCount = event;
  h1.textContent = clickCount + 'x clicked';
});


singleClickStream
  .throttle(1000)
  .subscribe(suggestion => {
    h1.textContent = '-';
  });

multiClickStream
  .throttle(1000)
  .subscribe(suggestion => {
    h1.textContent = '-';
  });




