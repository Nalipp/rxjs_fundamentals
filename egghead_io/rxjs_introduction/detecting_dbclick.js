var Observable = Rx.Observable;

var button = document.querySelector('button');
var h1 = document.querySelector('h1');

var clickStream = Rx.Observable.fromEvent(button, 'click');

var doubleClickStream = clickStream
  .buffer(() => clickStream.throttle(250)) // end the buffer after 250ms of silence
  .map(arr => arr.length)          // the buffer returns an array that can be maped
  .filter(len => len === 2);

clickStream.subscribe(event => {
  h1.textContent = 'single clicked';
});

doubleClickStream.subscribe(event => {
  h1.textContent = 'double clicked';
});

clickStream
  .throttle(1000)
  .subscribe(suggestion => {
    h1.textContent = '-';
  });

doubleClickStream
  .throttle(1000)
  .subscribe(suggestion => {
    h1.textContent = '-';
  });




// syncronous approach
  // button.addEventListener('click', function(e) {
  //   text = document.createTextNode('clicked!')
  //   h1.appendChild(text);
  // });

