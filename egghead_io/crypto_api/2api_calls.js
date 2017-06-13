var korbitBtcKrw = 'https://api.korbit.co.kr/v1/ticker?currency_pair=btc_krw';
var korbitEthKrw = 'https://api.korbit.co.kr/v1/ticker?currency_pair=eth_krw';
var poloniexAll = 'https://poloniex.com/public?command=returnTicker';
var coinbaseBtcUsd = "https://api.coinbase.com/v2/prices/BTC-USD/spot";
var coinbaseEthUsd = "https://api.coinbase.com/v2/prices/ETH-USD/spot";
var coinbaseBtcCurrencyRates = "https://api.coinbase.com/v2/exchange-rates?currency=BTC";

var reqS1 = Rx.Observable.of(korbitBtcKrw);
var reqS2 = Rx.Observable.of(korbitEthKrw);
// var reqS3 = Rx.Observable.of(poloniexAll);
var reqS4 = Rx.Observable.of(coinbaseBtcUsd);
var reqS5 = Rx.Observable.of(coinbaseEthUsd);
// var reqS6 = Rx.Observable.of(coinbaseBtcCurrencyRates);

var responseStream = reqS1.merge(reqS2).merge(reqS4).merge(reqS5)
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
    .map(function(x) { 
      if (x.data) {
        return '
        ' + x.data.amount
      } else {
        return x.last
      }
    })
  );

responseStream.subscribe(response => {
  console.log(response);
});
