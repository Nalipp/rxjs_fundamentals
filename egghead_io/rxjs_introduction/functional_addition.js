var Rx = require('rxjs/Rx');

// syncronous example array addition 
  // var source = ['1', '3', '4', 'foo', '5', 'bar', '2', '4'];

  // var result = source
  //     .map(num => Number(num))
  //     .filter(num => !isNaN(num))
  //     .reduce((a, b) => a + b);

  // console.log(result);


// adding with an event stream
var source1 = Rx.Observable.interval(200).take(9)
    .map(i => ['1', '3', '4', 'foo', '5', 'bar', '2', '4'][i]);

var source2 = Rx.Observable.interval(200).take(9)
    .map(i => ['2', '3', '4', 'foo', '5', 'bar', '2', '4'][i]);

var source3 = Rx.Observable.interval(200).take(9)
    .map(i => ['2', '3', '4', 'foo', '5', 'bar', '2', '4'][i]);

var result = source1.merge(source2).merge(source3)
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  // .reduce((x, y) => x + y);


result.subscribe(x => console.log(x)); 



// var source1 = Rx.Observable.interval(200).take(9)
//     .map(i => [
//       {
//         name: 'bill',
//         age: '20'
//       },
//       {
//         name: 'tim',
//         age: '21'
//       },
//       {
//         name: 'chase',
//         age: '22'
//       },
//     ][i]);

// var source2 = Rx.Observable.interval(200).take(9)
//     .map(i => [
//       {
//         name: 'bill',
//         age: '20'
//       },
//       {
//         name: 'tim',
//         age: '21'
//       },
//       {
//         name: 'chase',
//         age: '22'
//       },
//     ][i]);

// var source3 = Rx.Observable.interval(200).take(9)
//     .map(i => [
//       {
//         name: 'bill',
//         age: '20'
//       },
//       {
//         name: 'tim',
//         age: '21'
//       },
//       {
//         name: 'chase',
//         age: '22'
//       },
//     ][i]);

// var result = source1.merge(source2).merge(source3)
//   .map(x => x)
//   // .distinct(x => x.name)


// result.subscribe(x => console.log(x)); 



