// var poloniex = 'https://poloniex.com/public?command=returnTicker';
// var bithumb = 'https://api.bithumb.com/public/ticker/ALL';
// var coinone = 'https://api.coinone.co.kr/ticker/?currency=all';
// var kraken = 'https://api.kraken.com/0/public/Ticker?pair=ETHXBT';
// var bitfinex = 'https://api.bitfinex.com/v1/pubticker/BTCUSD';
// var coinbase = 'https://api.coinbase.com/v2/prices/BTC-USD/spot';
// var okcoin = 'https://www.okcoin.com/api/v1/ticker.do?symbol=btc_usd';
// var korbit = 'https://api.korbit.co.kr/v1/ticker?currency_pair=btc_krw';

function korbitTicker() {
  var korbitBtcKrw = 'https://api.korbit.co.kr/v1/ticker?currency_pair=btc_krw';
  var korbitEthKrw = 'https://api.korbit.co.kr/v1/ticker?currency_pair=eth_krw';

  createObservable(korbitBtcKrw);
  createObservable(korbitEthKrw);
}

function poloniexTicker() {
  var poloniexAll = 'https://poloniex.com/public?command=returnTicker';

  createObservable(poloniexAll);
}

function coinbaseTicker() {
  var coinbaseBtcUsd = "https://api.coinbase.com/v2/prices/BTC-USD/spot";
  var coinbaseEthUsd = "https://api.coinbase.com/v2/prices/ETH-USD/spot";

  createObservable(coinbaseBtcUsd);
  createObservable(coinbaseEthUsd);
}

function currencyRatesBtc() {
  var coinbaseBtcCurrencyRates = "https://api.coinbase.com/v2/exchange-rates?currency=BTC";

  createObservable(coinbaseBtcCurrencyRates);
}

korbitTicker();
poloniexTicker();
coinbaseTicker();
currencyRatesBtc();


function createObservable(url) {
  var requestStream = Rx.Observable.of(url);

  var responseStream = requestStream
    .flatMap(requestUrl =>
      Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
      .map(x => x)
    );

  responseStream.subscribe(response => {
    console.log(response);
  });
}
