var endpoingArr = [];

var state = 'TX'
var tech = 'sql'

for (var i = 0; i < 976; i += 25) {
  endpoingArr.push('http://api.indeed.com/ads/apisearch?publisher=8829908049153205&format=json&q=title%3A' + tech + '&limit=25&start=' + i + '&l=' + state + '&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2');
}

var requestStream0 = Rx.Observable.of(endpoingArr[0]); var requestStream1 = Rx.Observable.of(endpoingArr[1]); var requestStream2 = Rx.Observable.of(endpoingArr[2]); var requestStream3 = Rx.Observable.of(endpoingArr[3]); var requestStream4 = Rx.Observable.of(endpoingArr[4]); var requestStream5 = Rx.Observable.of(endpoingArr[5]); var requestStream6 = Rx.Observable.of(endpoingArr[6]); var requestStream7 = Rx.Observable.of(endpoingArr[7]); var requestStream8 = Rx.Observable.of(endpoingArr[8]); var requestStream9 = Rx.Observable.of(endpoingArr[9]); var requestStream10 = Rx.Observable.of(endpoingArr[10]); var requestStream11 = Rx.Observable.of(endpoingArr[11]); var requestStream12 = Rx.Observable.of(endpoingArr[12]); var requestStream13 = Rx.Observable.of(endpoingArr[13]); var requestStream14 = Rx.Observable.of(endpoingArr[14]); var requestStream15 = Rx.Observable.of(endpoingArr[15]); var requestStream16 = Rx.Observable.of(endpoingArr[16]); var requestStream17 = Rx.Observable.of(endpoingArr[17]); var requestStream18 = Rx.Observable.of(endpoingArr[18]); var requestStream19 = Rx.Observable.of(endpoingArr[19]); var requestStream20 = Rx.Observable.of(endpoingArr[20]); var requestStream21 = Rx.Observable.of(endpoingArr[21]); var requestStream22 = Rx.Observable.of(endpoingArr[22]); var requestStream23 = Rx.Observable.of(endpoingArr[23]); var requestStream24 = Rx.Observable.of(endpoingArr[24]); var requestStream25 = Rx.Observable.of(endpoingArr[25]); var requestStream26 = Rx.Observable.of(endpoingArr[26]); var requestStream27 = Rx.Observable.of(endpoingArr[27]); var requestStream28 = Rx.Observable.of(endpoingArr[28]); var requestStream29 = Rx.Observable.of(endpoingArr[29]); var requestStream30 = Rx.Observable.of(endpoingArr[30]); var requestStream31 = Rx.Observable.of(endpoingArr[31]); var requestStream32 = Rx.Observable.of(endpoingArr[32]); var requestStream33 = Rx.Observable.of(endpoingArr[33]); var requestStream34 = Rx.Observable.of(endpoingArr[34]); var requestStream35 = Rx.Observable.of(endpoingArr[35]); var requestStream36 = Rx.Observable.of(endpoingArr[36]); var requestStream37 = Rx.Observable.of(endpoingArr[37]); var requestStream38 = Rx.Observable.of(endpoingArr[38]); var requestStream39 = Rx.Observable.of(endpoingArr[39]);

var responseStream = requestStream1
  .merge(requestStream2).merge(requestStream3).merge(requestStream4).merge(requestStream5).merge(requestStream6)
  .merge(requestStream7).merge(requestStream8).merge(requestStream9).merge(requestStream10).merge(requestStream11)
  .merge(requestStream12).merge(requestStream13).merge(requestStream14).merge(requestStream15).merge(requestStream16)
  .merge(requestStream17).merge(requestStream18).merge(requestStream19).merge(requestStream20).merge(requestStream21)
  .merge(requestStream22).merge(requestStream23).merge(requestStream24).merge(requestStream25).merge(requestStream26)
  .merge(requestStream27).merge(requestStream28).merge(requestStream29).merge(requestStream30).merge(requestStream31)
  .merge(requestStream32).merge(requestStream33).merge(requestStream34).merge(requestStream35).merge(requestStream36)
  .merge(requestStream37).merge(requestStream38).merge(requestStream39)
  .distinct()
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
    .map(job => job.results)
  ).concatAll();

responseStream.subscribe(response => {
  console.log(response);
});



Array.prototype.concatAll = function() {
  var results = [];
  
  this.forEach(function(subArray) {
    subArray.forEach(function(item) {
      results.push(item);
    });
  });
  return results;
};

