var Rx = require('rxjs');

var streamA = Rx.Observable.of(3, 4);
var streamB = streamA.map(a => a * 10);

streamB.subscribe(x => console.log(x));
