
// forEach

  // var result = [];

  // arr.forEach(function(num) {
  //   result.push(num + 5);  
  // });

  // console.log(JSON.stringify(result));

// map

// filter
  // function greaterThan(arr, value) {
  //   arr.filter(function(num) {
  //     return num > value;
  //   });
  // }

  // Array.prototype.filter = function(predicate) {
  // var results = [];

  //   this.forEach(function(item) {
  //     if (predicate(item)) {
  //       results.push(item);
  //     }
  //   });
  //   return results;
  // }


// var arr= [1, 2, 3, 4];
// var biggerThan2 = greaterThan(arr, 2);

// console.log(JSON.stringify(biggerThan2));


// var stocks = [
//   { symbol: 'XFX', price: 121, volume: 10023 },
//   { symbol: 'TNZ', price: 22, volume: 332 },
//   { symbol: 'JXJ', price: 54, volume: 121 },
// ];

// var stock_symbols = 
//   stocks.
//     filter(function(stock) {
//       return stock.price > 33;
//     }).
//     map(function(stock) {
//       return stock.symbol;
//     });


// console.log(stock_symbols);


var exchanges = [
  [
    { symbol: 'XFX', price: 149, volume: 10023 },
    { symbol: 'FFX', price: 121, volume: 10023 },
  ],
  [
    { symbol: 'TNZ', price: 22, volume: 332 },
    { symbol: 'JXJ', price: 54, volume: 121 },
  ],
];

Array.prototype.concatAll = function() {
  var results = [];

  this.forEach(function(subArray) {
    subArray.forEach(function() {
      results.push(subArray); 
    });
  });

  return results;
}

var stocks = exchanges.concatAll();

stocks.forEach(function(stock) {
  console.log(stock); 
});



// exchanges.forEach(function(exchange) {
//   exchange.forEach(function(stock) {
//     console.log(stock);
//   });
// });
