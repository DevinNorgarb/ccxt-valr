//  ---------------------------------------------------------------------------
import Exchange from './abstract/valr.js';
import { sha512 } from './static_dependencies/noble-hashes/sha512.js';

// import { ExchangeError,  AuthenticationError, RequestTimeout} from './base/errors.js';
// import { Precise } from './base/Precise.js';

/**
 * @class valr
 * @augments Exchange
 */
export default class valr extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'valr',
            'name': 'VALR',
            'countries': [ 'ZA' ],
            'rateLimit': 1000,
            'version': '1',
            // 'comment': 'This comment is optional',
            'has': {
                'fetchCurrencies': true,
            },
            'urls': {
                'logo': undefined,
                'api': {
                    'public': 'https://api.valr.com/v1/public',
                    'private': 'https://api.valr.com/v1',
                },
                'www': 'https://www.valr.com',
                'doc': [
                    'https://docs.valr.com/',
                ],
                'referral': {
                    'url': 'https://www.valr.com/invite/VAE2R2GV',
                },
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
            },
            'api': {
                'public': {
                    'get': [
                        'marketdata/{pair}/orderbook',
                        'marketdata/{pair}/orderbook/full',
                        'currencies',
                        'pairs',
                        'ordertypes',
                        '{pair}/ordertypes',
                        'marketsummary',
                        '{pair}/marketsummary',
                        '{pair}/markprice/buckets',
                        '{pair}/trades',
                        '{pair}/futures/funding/history',
                        'time',
                        'status',
                    ],
                },
                'private': {
                    'get': [
                        'account/api-keys/current',
                        'account/balances',
                        'account/transactionhistory',
                        'account/fees/trade',
                        'marketdata/{pair}/orderbook',
                        'marketdata/{pair}/tradehistory',
                    ],
                },
            },
        });
    }

    async fetchCurrencies (params = {}) {
        // markets are returned as a list
        // currencies are returned as a dict
        // this is for historical reasons
        // and may be changed for consistency later
        const currencies = await this.publicGetCurrencies (params);
        // [
        //     {
        //       "symbol": "R",
        //       "isActive": true,
        //       "shortName": "ZAR",
        //       "longName": "Rand",
        //       "decimalPlaces": "2",
        //       "withdrawalDecimalPlaces": "2",
        //       "collateral": true,
        //       "collateralWeight": "1"
        //     },
        //     {
        //       "symbol": "BTC",
        //       "isActive": true,
        //       "shortName": "BTC",
        //       "longName": "Bitcoin",
        //       "decimalPlaces": "8",
        //       "withdrawalDecimalPlaces": "8",
        //       "collateral": true,
        //       "collateralWeight": "0.95",
        //       "defaultNetworkType": "Bitcoin",
        //       "supportedNetworks": [
        //         {
        //           "networkType": "Bitcoin",
        //           "networkLongName": "Bitcoin"
        //         }
        //       ]
        //     },
        //     {
        //       "symbol": "ETH",
        //       "isActive": true,
        //       "shortName": "ETH",
        //       "longName": "Ethereum",
        //       "decimalPlaces": "18",
        //       "withdrawalDecimalPlaces": "8",
        //       "collateral": true,
        //       "collateralWeight": "0.95",
        //       "defaultNetworkType": "Ethereum",
        //       "supportedNetworks": [
        //         {
        //           "networkType": "Ethereum",
        //           "networkLongName": "Ethereum"
        //         }
        //       ]
        //     },
        //     ...
        // ]
        const result = {};
        for (let i = 0; i < currencies.length; i++) {
            const currency = currencies[i];
            const code = this.safeCurrencyCode (this.safeString (currency, 'symbol'));
            result[code] = {
                'id': this.safeString (currency, 'symbol'),
                'code': code,
                'info': currency,
                'name': this.safeString (currency, 'longName'),
                'active': this.safeString (currency, 'isActive'),
                'deposit': undefined,
                'withdraw': undefined,
                'fee': undefined,
                'precision': this.safeString (currency, 'decimalPlaces'),
                'limits': {
                    'amount': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'withdraw': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'networks': {},
            };
        }
        return result;
    }

    async fetchMarkets (params = {}) {
        /**
         * @method
         * @name valr#fetchMarkets
         * @see https://docs.valr.com/#cd1f0448-3da3-44cf-b00d-91edd74e7e19
         * @description retrieves data on all markets for valr
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} an array of objects representing market data
         */
        const markets = await this.publicGetMarketsummary (params);
        return this.parseMarkets (markets);
    }

    // parseMarket(market: any): Market {
    // [
    //     {
    //         "currencyPair": "BTCZAR",
    //         "askPrice": "520000",
    //         "bidPrice": "400000",
    //         "lastTradedPrice": "400000",
    //         "previousClosePrice": "400000",
    //         "baseVolume": "0",
    //         "highPrice": "400000",
    //         "lowPrice": "0",
    //         "created": "2022-06-12T18:06:05.001Z",
    //         "changeFromPrevious": "0",
    //         "markPrice": "400000"
    //     },
    //     {
    //         "currencyPair": "ETHZAR",
    //         "askPrice": "32158",
    //         "bidPrice": "30899",
    //         "lastTradedPrice": "30899",
    //         "previousClosePrice": "30899",
    //         "baseVolume": "0",
    //         "highPrice": "30899",
    //         "lowPrice": "0",
    //         "created": "2022-06-12T18:06:05.001Z",
    //         "changeFromPrevious": "0",
    //         "markPrice": "30899"
    //     }
    // ]
    // }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = this.urls['api'][api] + '/' + this.implodeParams (path, params);
        const query = this.omit (params, this.extractParams (path));
        if (Object.keys (query).length) {
            url += '?' + this.urlencode (query);
        }
        if (body === undefined) {
            body = '';
        }
        if (api === 'private') {
            this.checkRequiredCredentials ();
            const timestamp = this.milliseconds ().toString ();
            const full_path = '/v' + this.version + '/' + path;
            const message = timestamp + method.toUpperCase () + full_path + body;
            const payloadBase64 = this.stringToBase64 (message);
            const signature = this.hmac (
                this.base64ToBinary (payloadBase64),
                this.base64ToBinary (this.stringToBase64 (this.secret)),
                sha512,
                'hex'
            );
            headers = {
                'X-VALR-API-KEY': this.apiKey,
                'X-VALR-SIGNATURE': signature,
                'X-VALR-TIMESTAMP': timestamp,
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
}
