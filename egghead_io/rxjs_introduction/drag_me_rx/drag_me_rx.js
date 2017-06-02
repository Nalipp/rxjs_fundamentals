var button = document.querySelector('button');

var Observable = Rx.Observable;

var parent1 = document.getElementById("parent1");
var parent2 = document.getElementById("parent2");

var widget1 = document.getElementById("widget1");
var widget2 = document.getElementById("widget2");

var mouseDowns = Observable.fromEvent(widget1, "mousedown");
var mouseDowns = Observable.fromEvent(widget2, "mousedown");

var parentMouseMoves1 = Observable.fromEvent(parent1, "mousemove");
var parentMouseMoves2 = Observable.fromEvent(parent2, "mousemove");

var parentMouseUps1 = Observable.fromEvent(parent1, "mouseup");
var parentMouseUps2 = Observable.fromEvent(parent2, "mouseup");

// var stocks = 
//   exchanges.
//     map(function(exchange) {
//       return exchange.stocks.
//         filter(function(stock) { return stock.price >= 100.00; });
//     }).
//     concatAll();

var drags1 = 
  mouseDowns.
    map(function(e) {
      return parentMouseMoves1.
        takeUntil(parentMouseUps1);
    }).
    concatAll();

var drags2 = 
  mouseDowns.
    map(function(e) {
      return parentMouseMoves2.
        takeUntil(parentMouseUps2);
    }).
    concatAll();

var subscription = 
  drags1.forEach(
    function onNext(e) {
      widget1.style.left = e.clientX + "px";
      widget1.style.top = e.clientY + "px";
    },
    function onError(error) {
      console.log(error);
    },
    function onCompleted() {
      
    });

var subscription = 
  drags2.forEach(
    function onNext(e) {
      widget2.style.left = e.clientX + "px";
      widget2.style.top = e.clientY + "px";
    },
    function onError(error) {
      console.log(error);
    },
    function onCompleted() {
      
    });


