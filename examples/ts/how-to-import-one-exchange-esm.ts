import { binance } from '../../ts/ccxt.js';

// AUTO-TRANSPILE //

async function example () {
    const exchange = new binance ({});
    const ob = await exchange.fetchOrderBook ('BTC/USDT', 3);
    const asks = ob['asks'];
    const bids = ob['bids'];
    console.log (asks);
    console.log (bids);
}

example ();
