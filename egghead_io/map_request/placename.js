var zipcodes = require('zipcodes');
var cities = require('cities');


var city = zipcodes.lookupByName('boise', 'ID');
var result = [];

for (var i = 0; i < city.length; i++) {
  result.push([city[i].zip, city[i].latitude, city[i].longitude]);
}

console.log(result);


// var cords = zipcodes.lookup(city[3].zip);

// console.log(cities.zip_lookup(city[3].zip));
// console.log(cities.zip_lookup(city[5].zip));
// console.log(cities.zip_lookup(city[7].zip));

