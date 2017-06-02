// var Rx = require('rxjs/Rx');
var Observable = Rx.Observable;

var button = document.querySelector('button');

// var eventHandler = function(e) {
//   alert('clicked');
//   button.removeEventListener('click', eventHandler);
// }

// button.addEventListener('click', eventHandler);

var clicks = Observable.fromEvent(button, 'click');

var points =            // map information gathered from the clicked element
  clicks.map(function(e) {
  return {x: e.clientX, y: e.clientY};
});

var subscription =      // subscription object that allows you to remove the event listener
  points.forEach(
    function(points) {
      alert(JSON.stringify(points));
      subscription.dispose();  // stop the all the callbacks, remove the event listener
    },
    function onError(error) {
      console.log('Error'); 
    },
    function onCompleted() {
      console.log('Done'); 
    });

  




