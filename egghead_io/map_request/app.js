var express = require('express');
var app = express();
var Rx = require('rxjs/Rx');
var request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var coordinates = [ 37.733795,	-122.446747 ];
var radius = 500;

var urls = getUrls(coordinates[0], coordinates[1]);

function getUrls(lat, lon) {
  var result = [];

  for (var i = 0; i < 50; i++) {
    var lat = randomize(lat, radius)
    var lon = randomize(lon, radius)
    result.push('https://maps.googleapis.com/maps/api/streetview?size=200x200&location=' + lat + ',' + lon + '&fov=90&heading=235&pitch=10&key=AIzaSyBg1Af2Yu2AGi-BsoJIKmcAhJJSkGBD9OU');
  }
  console.log(result);
  return result;
}

function randomize(coordinate, radius) {
  console.log('printing coordinate');
  console.log(coordinate);
  var randomAmount = Math.floor(Math.random() * (radius - 1) + 1) * 0.00001;
  var newCoordinate = (Math.random() >= 0.5) ? (coordinate + randomAmount) : (coordinate - randomAmount);

  return newCoordinate; 
}

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/map', function(req, res) {
  res.render('map', { urls: urls });
});

app.listen(3000, function() {
  console.log('listening on localhost 3000');
});

