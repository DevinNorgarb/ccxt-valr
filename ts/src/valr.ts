//  ---------------------------------------------------------------------------
import Exchange from './abstract/valr.js';
import { Market, Balances, Precise, Tickers, Ticker } from '../ccxt.js';
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
                'CORS': undefined,
                'spot': true,
                'margin': undefined,
                'swap': undefined,
                'future': undefined,
                'option': undefined,
                'fetchCurrencies': true,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchBalance': true,
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
            result[code] = this.safeCurrencyStructure ({
                'id': this.safeString (currency, 'symbol'),
                'code': code,
                'info': currency,
                'name': this.safeString (currency, 'longName'),
                'active': this.safeString (currency, 'isActive'),
                'precision': this.safeString (currency, 'decimalPlaces'),
            });
        }
        return result;
    }

    async fetchMarkets (params = {}) {
        const markets = await this.publicGetPairs (params);
        // [
        //     {'symbol': 'ENJUSDC',
        //     'baseCurrency': 'ENJ',
        //     'quoteCurrency': 'USDC',
        //     'shortName': 'ENJ/USDC',
        //     'active': True,
        //     'minBaseAmount': '3.5',
        //     'maxBaseAmount': '3586.3',
        //     'minQuoteAmount': '2',
        //     'maxQuoteAmount': '5000',
        //     'tickSize': '0.01',
        //     'baseDecimalPlaces': '2',
        //     'marginTradingAllowed': False,
        //     'currencyPairType': 'SPOT'},
        //    {'symbol': 'USDTZARPERP',
        //     'baseCurrency': 'USDT',
        //     'quoteCurrency': 'ZAR',
        //     'shortName': 'USDT/ZARPERP',
        //     'active': True,
        //     'minBaseAmount': '1',
        //     'maxBaseAmount': '250000',
        //     'minQuoteAmount': '15',
        //     'maxQuoteAmount': '5000000',
        //     'tickSize': '0.01',
        //     'baseDecimalPlaces': '3',
        //     'marginTradingAllowed': False,
        //     'currencyPairType': 'FUTURE'
        // },
        // ]
        return this.parseMarkets (markets);
    }

    parseMarket (market): Market {
        const base = this.safeCurrencyCode (this.safeString (market, 'baseCurrency'));
        const quote = this.safeCurrencyCode (this.safeString (market, 'quoteCurrency'));
        const currencyPairType = this.safeString (market, 'currencyPairType');
        let marketType = undefined;
        let spot = undefined;
        let swap = undefined;
        let symbol = base + '/' + quote;
        let contract = false;
        if (currencyPairType === 'SPOT') {
            marketType = 'spot';
            spot = true;
        } else if (currencyPairType === 'FUTURE') {
            marketType = 'swap';
            spot = false;
            swap = true;
            symbol = symbol + ':' + quote;
            contract = true;
        }
        return this.safeMarketStructure ({
            'id': this.safeString (market, 'symbol'),
            'symbol': symbol,
            'base': base,
            'quote': quote,
            'baseId': this.safeString (market, 'baseCurrency'),
            'quoteId': this.safeString (market, 'quoteCurrency'),
            'active': this.safeBool (market, 'active'),
            'type': marketType,
            'spot': spot,
            'margin': this.safeBool (market, 'marginTradingAllowed'),
            'future': false,
            'swap': swap,
            'option': false,
            'contract': contract,
            'percentage': true,
            'tierBased': false,
            'precision': {
                'price': this.safeFloat (market, 'baseDecimalPlaces'),
                'amount': this.safeFloat (market, 'tickSize'),
            },
            'limits': {
                'amount': {
                    'min': this.safeFloat (market, 'minBaseAmount'),
                    'max': this.safeFloat (market, 'maxBaseAmount'),
                },
                'price': {
                    'min': this.safeFloat (market, 'minQuoteAmount'),
                    'max': this.safeFloat (market, 'maxQuoteAmount'),
                },
            },
            'info': market,
        });
    }

    async fetchTickers (symbols: string[] = undefined, params = {}): Promise<Tickers> {
        await this.loadMarkets ();
        const response = await this.publicGetMarketsummary (params);
        // [
        //     {
        //       "currencyPair": "BTCZAR",
        //       "askPrice": "520000",
        //       "bidPrice": "400000",
        //       "lastTradedPrice": "400000",
        //       "previousClosePrice": "400000",
        //       "baseVolume": "0",
        //       "highPrice": "400000",
        //       "lowPrice": "0",
        //       "created": "2022-06-12T18:06:05.001Z",
        //       "changeFromPrevious": "0",
        //       "markPrice": "400000"
        //     },
        //     {
        //       "currencyPair": "ETHZAR",
        //       "askPrice": "32158",
        //       "bidPrice": "30899",
        //       "lastTradedPrice": "30899",
        //       "previousClosePrice": "30899",
        //       "baseVolume": "0",
        //       "highPrice": "30899",
        //       "lowPrice": "0",
        //       "created": "2022-06-12T18:06:05.001Z",
        //       "changeFromPrevious": "0",
        //       "markPrice": "30899"
        //     },
        //     ...
        // ]
        return this.parseTickers (response, symbols, params);
    }

    async fetchTicker (symbol: string, params = {}): Promise<Ticker> {
        await this.loadMarkets ();
        const market = this.marketId (symbol);
        const request = {
            'pair': market,
        };
        const response = await this.publicGetPairMarketsummary (this.extend (request, params));
        return this.parseTicker (response);
    }

    parseTicker (ticker: object, market: Market = undefined): Ticker {
        const timestamp = this.parse8601 (this.safeString (ticker, 'created'));
        const result = {
            'symbol': this.safeSymbol (this.safeString (ticker, 'currencyPair')),
            'info': ticker,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeString (ticker, 'highPrice'),
            'low': this.safeString (ticker, 'lowPrice'),
            'bid': this.safeString (ticker, 'bidPrice'),
            'ask': this.safeString (ticker, 'askPrice'),
            'close': this.safeString (ticker, ''),
            'last': this.safeString (ticker, 'lastTradedPrice'),
            'previousClose': this.safeString (ticker, 'previousClosePrice'),
            'average': this.safeString (ticker, 'markPrice'),
            'change': this.safeString (ticker, 'changeFromPrevious'),
            'baseVolume': this.safeString (ticker, 'baseVolume'),
            'quoteVolume': this.safeString (ticker, 'quoteVolume'),
        };
        return this.safeTicker (result);
    }

    async fetchBalance (params = {}): Promise<Balances> {
        await this.loadMarkets ();
        const response = await this.privateGetAccountBalances (params);
        // [
        //     {
        //       "currency": "USDT",
        //       "available": "44822.97549155",
        //       "reserved": "99.99925",
        //       "total": "145612.43129945",
        //       "updatedAt": "2023-04-25T09:00:04.406Z",
        //       "lendReserved": "100000",
        //       "borrowReserved": "689.4565579",
        //       "borrowedAmount": "0",
        //       "totalInReference": "7828.62533868",
        //       "totalInReferenceWeighted": "7828.62533868",
        //       "referenceCurrency": "USDC"
        //     },
        //     {
        //       "currency": "BTC",
        //       "available": "0",
        //       "reserved": "0",
        //       "total": "-0.00101056",
        //       "updatedAt": "2023-04-25T09:00:00.103Z",
        //       "lendReserved": "0",
        //       "borrowReserved": "0",
        //       "borrowedAmount": "0.00101056",
        //       "totalInReference": "-28.29568",
        //       "totalInReferenceWeighted": "-27.588288",
        //       "referenceCurrency": "USDC"
        //     }
        // ]
        return this.parseBalance (response);
    }

    parseBalance (balances): Balances {
        const result = {
            'timestamp': undefined,
            'datetime': undefined,
            'info': balances,
        };
        for (let i = 0; i < balances.length; i++) {
            const balance = balances[i];
            const code = this.safeCurrencyCode (this.safeString (balance, 'currency'));
            const debt = Precise.stringAdd (
                this.safeString (balance, 'lendReserved'),
                this.safeString (balance, 'borrowReserved')
            );
            result[code] = {
                'free': this.safeFloat (balance, 'available'),
                'used': this.safeFloat (balance, 'reserved'),
                'total': this.safeFloat (balance, 'total'),
                'debt': debt,
            };
        }
        return this.safeBalance (result);
    }

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
