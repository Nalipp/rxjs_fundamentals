var Rx = require('rxjs/Rx');

// syncronous example array addition 
  // var source = ['1', '3', '4', 'foo', '5', 'bar', '2', '4'];

  // var result = source
  //     .map(num => Number(num))
  //     .filter(num => !isNaN(num))
  //     .reduce((a, b) => a + b);

  // console.log(result);


// adding with an event stream
var source = Rx.Observable.interval(400).take(9)
    .map(i => ['1', '3', '4', 'foo', '5', 'bar', '2', '4'][i]);

var result = source
    .map(num => Number(num))
    .filter(num => !isNaN(num))
    .reduce((a, b) => a + b);

result.subscribe(x => console.log(x)); 



