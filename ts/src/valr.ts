//  ---------------------------------------------------------------------------
import Exchange from './abstract/valr.js';
import type {
    Market,
    Balances,
    Tickers,
    Ticker,
    Order,
    OrderType,
    OrderSide,
    OrderRequest,
    Int,
    OrderBook,
    Trade,
    Currency,
    Transaction,
} from './base/types.js';
import { Precise } from './base/Precise.js';
import { sha512 } from './static_dependencies/noble-hashes/sha512.js';
import {
    NotSupported,
    ArgumentsRequired,
    InvalidOrder,
    BadSymbol,
    NullResponse,
    BadRequest,
} from './base/errors.js';

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
                'cancelAllOrders': true,
                'cancelOrder': true,
                'createMarketBuyOrderWithCost': true,
                'createMarketSellOrderWithCost': true,
                'createOrder': true,
                'fetchAccounts': true,
                'fetchBalance': true,
                'fetchClosedOrders': true,
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchDeposits': true,
                'fetchFundingLimits': false,
                'fetchL3OrderBook': true,
                'fetchLedger': false,
                'fetchMyTrades': true,
                'fetchOHLCV': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': true,
                'fetchStatus': true,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFees': true,
                'fetchTransactions': false,
                'fetchWithdrawals': true,
                'transfer': false,
                'withdraw': true,
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
                        '{pair}/orderbook',
                        '{pair}/orderbook/full',
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
                        'futures/info',
                    ],
                },
                'private': {
                    'get': [
                        'account/api-keys/current',
                        'account/subaccounts',
                        'account/balances',
                        'account/balances/all',
                        'account/transactionhistory',
                        'account/{pair}/tradehistory',
                        'account/fees/trade',
                        'marketdata/{pair}/orderbook',
                        'marketdata/{pair}/orderbook/full',
                        'marketdata/{pair}/tradehistory',
                        'wallet/crypto/{currency}/deposit/address',
                        'wallet/crypto/{currency}/deposit/history',
                        'wallet/crypto/address-book',
                        'wallet/crypto/address-book/{currency}',
                        'wallet/crypto/{currency}/withdraw',
                        'wallet/crypto/{currency}/withdraw/{id}',
                        'wallet/crypto/{currency}/withdraw/history',
                        'wallet/fiat/{currency}/accounts/{id}',
                        'wallet/fiat/{currency}/accounts',
                        'wallet/fiat/{currency}/banks',
                        'wallet/fiat/{currency}/deposit/reference',
                        'wallet/fiat/{currency}/deposit/reference/{currency}',
                        'wallet/fiat/{currency}/auto-buy',
                        'wire/accounts',
                        'simple/{pair}/order/{id}',
                        'pay/limits',
                        'pay/payid',
                        'pay/history',
                        'pay/identifier/{identifier}',
                        'pay/transactionid/{id}',
                        'orders/{pair}/orderid/{id}',
                        'orders/{pair}/customerorderid/{id}',
                        'orders/open',
                        'orders/history',
                        'orders/history/summary/orderid/{id}',
                        'orders/history/summary/customerorderid/{id}',
                        'orders/history/detail/orderid/{id}',
                        'orders/history/detail/customerorderid/{id}',
                        'staking/balances/{currency}',
                        'staking/rates',
                        'staking/rates/{currency}',
                        'staking/rewards',
                        'staking/history',
                        'margin/status',
                        'margin/account/status',
                        'positions/open',
                        'positions/closed/summary',
                        'positions/closed',
                        'positions/history',
                        'positions/funding/history',
                        'borrows/{currency}/history',
                        'loans/rates',
                    ],
                    'post': [
                        'account/subaccount',
                        'account/subaccounts/transfer',
                        'wallet/crypto/{currency}/withdraw',
                        'wallet/fiat/{currency}/accounts',
                        'wallet/fiat/{currency}/withdraw',
                        'wire/withdrawals',
                        'simple/{pair}/quote',
                        'simple/{pair}/order',
                        'pay',
                        'orders/limit',
                        'orders/market',
                        'orders/stop/limit',
                        'batch/orders',
                        'staking/stake',
                        'staking/un-stake',
                    ],
                    'put': [
                        'pay/transactionid/{id}/reverse',
                        'orders/modify',
                        'margin/account/status',
                    ],
                    'delete': [
                        'wallet/fiat/{currency}/accounts/{id}',
                        'orders/order',
                        'orders',
                        'orders/{pair}',
                    ],
                },
                'privateV2': {
                    'get': [
                        'margin/status',
                        'healthz',
                    ],
                    'post': [
                        'orders/market',
                        'orders/limit',
                        'orders/stop/limit',
                    ],
                    'put': [
                        'orders/modify',
                    ],
                    'delete': [
                        'orders/order',
                    ],
                },
            },
            'headers': {
                'Content-Type': 'application/json',
            },
            'options': {
                'fiat': {
                    'ZAR': 'ZAR',
                    'USD': 'USD',
                },
            },
        });
    }

    checkRequiredSymbolAugument (methodName: string, symbol: string) {
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' ' + methodName + '() requires valid symbol name');
        }
        const market = this.safeMarket (symbol);
        if (market === undefined) {
            throw new BadSymbol (this.id + ' ' + methodName + '() found no valid market for symbol: ' + symbol);
        }
    }

    checkRequiredCurrencyCodeAugument (methodName: string, code: string) {
        if (code === undefined) {
            throw new ArgumentsRequired (this.id + ' ' + methodName + '() requires valid currency code name');
        }
        const currency = this.safeCurrency (code);
        if (currency['id'] === undefined) {
            throw new BadRequest (this.id + ' ' + methodName + '() found no valid currency ID for currency code: ' + code);
        }
    }

    isFiat (code) {
        return this.inArray (code, this.options['fiat']);
    }

    async fetchTime (params = {}): Promise<number> {
        const response = await this.publicGetTime (params);
        return this.parse8601 (this.safeString (response, 'time'));
    }

    async fetchStatus (params = {}): Promise<any> {
        const response = await this.publicGetStatus (params);
        const statusReport = this.safeString (response, 'status');
        let status = undefined;
        if (statusReport === 'online') {
            status = 'ok';
        } else if (statusReport === 'read-only') {
            status = 'maintenance';
        }
        return {
            'status': status,
            'updated': undefined,
            'eta': undefined,
            'url': 'https://status.valr.com/',
            'info': response,
        };
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
            const code = this.safeCurrencyCode (this.safeString (currency, 'shortName'));
            result[code] = this.safeCurrencyStructure ({
                'id': this.safeString (currency, 'shortName'),
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
        this.checkRequiredSymbolAugument (this.id + ' fetchTicker', symbol);
        const marketId = this.marketId (symbol);
        const request = {
            'pair': marketId,
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

    async fetchOrderBook (symbol: string, limit: Int = undefined, params = {}): Promise<OrderBook> {
        await this.loadMarkets ();
        let response = undefined;
        this.checkRequiredSymbolAugument ('fetchOrderBook', symbol);
        params['pair'] = this.marketId (symbol);
        if (this.checkRequiredCredentials (false)) {
            response = await this.privateGetMarketdataPairOrderbook (params);
        } else {
            response = await this.publicGetPairOrderbook (params);
        }
        const lastDateChange = this.safeString (response, 'LastChange');
        const timestamp = this.parse8601 (lastDateChange);
        return this.parseOrderBook (response, symbol, timestamp, 'Bids', 'Asks', 'price', 'quantity', 'orderCount');
    }

    async fetchL3OrderBook (symbol: string, limit: Int = undefined, params = {}): Promise<OrderBook> {
        await this.loadMarkets ();
        let response = undefined;
        this.checkRequiredSymbolAugument ('fetchOrderBook', symbol);
        params['pair'] = this.marketId (symbol);
        if (this.checkRequiredCredentials (false)) {
            response = await this.privateGetMarketdataPairOrderbookFull (params);
        } else {
            response = await this.publicGetPairOrderbookFull (params);
        }
        const lastDateChange = this.safeString (response, 'LastChange');
        const timestamp = this.parse8601 (lastDateChange);
        return this.parseOrderBook (response, symbol, timestamp, 'Bids', 'Asks', 'price', 'quantity', 'id');
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

    async fetchAccounts (params = {}): Promise<any[]> {
        const response = await this.privateGetAccountSubaccounts (params);
        return this.parseAccounts (response, params);
    }

    parseAccount (account, params = {}) {
        let accountType = undefined;
        if (this.safeString (account, 'label') === 'Primary') {
            accountType = 'main';
        } else {
            accountType = 'subaccount';
        }
        return {
            'id': this.safeString (account, 'id'),
            'type': accountType,
            'name': this.safeString (account, 'label'),
            'code': undefined,
            'info': account,
        };
    }

    async fetchOrder (id: string, symbol: string = undefined, params = {}): Promise<Order> {
        await this.loadMarkets ();
        this.checkRequiredSymbolAugument ('fetchOrder', symbol);
        const marketId = this.marketId (symbol);
        const request = {
            'id': id,
            'pair': marketId,
        };
        const response = await this.privateGetOrdersPairOrderidId (this.extend (request, params));
        // {
        //     "orderId": "00fa7cb4-ea7c-4b8e-beed-dc63e226a6a2",
        //     "orderStatusType": "Placed",
        //     "currencyPair": "BTCZAR",
        //     "originalPrice": "100000",
        //     "remainingQuantity": "0.02",
        //     "originalQuantity": "0.02",
        //     "orderSide": "buy",
        //     "orderType": "post-only limit",
        //     "failedReason": "",
        //     "orderUpdatedAt": "2024-03-12T09:42:37.766Z",
        //     "orderCreatedAt": "2024-03-12T09:42:37.766Z",
        //     "timeInForce": "GTC"
        // }
        return this.parseOrder (response);
    }

    async fetchOpenOrders (symbol: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Order[]> {
        await this.loadMarkets ();
        const response = await this.privateGetOrdersOpen (params);
        // [{'orderId': 'aa6dce9a-6acb-477f-9da8-223127e6b32d',
        // 'side': 'buy',
        // 'remainingQuantity': '0.02',
        // 'price': '100000',
        // 'currencyPair': 'BTCZAR',
        // 'createdAt': '2024-03-12T07:14:17.275Z',
        // 'originalQuantity': '0.02',
        // 'filledPercentage': '0.00',
        // 'updatedAt': '2024-03-12T07:14:17.275Z',
        // 'status': 'Placed',
        // 'type': 'post-only limit',
        // 'timeInForce': 'GTC'}]
        let market = undefined;
        if (symbol !== undefined) {
            market = this.safeValue (this.markets, symbol);
        }
        return this.parseOrders (response, market, since, limit, params);
    }

    async fetchClosedOrders (symbol: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Order[]> {
        await this.loadMarkets ();
        const response = await this.privateGetOrdersHistory (params);
        // [{'orderId': 'aa6dce9a-6acb-477f-9da8-223127e6b32d',
        //   'orderStatusType': 'Cancelled',
        //   'currencyPair': 'BTCZAR',
        //   'averagePrice': '0',
        //   'originalPrice': '100000',
        //   'remainingQuantity': '0.02',
        //   'originalQuantity': '0.02',
        //   'total': '0',
        //   'totalFee': '0',
        //   'feeCurrency': 'BTC',
        //   'orderSide': 'buy',
        //   'orderType': 'post-only limit',
        //   'failedReason': '',
        //   'orderUpdatedAt': '2024-03-12T07:16:14.205Z',
        //   'orderCreatedAt': '2024-03-12T07:14:17.275Z',
        //   'timeInForce': 'GTC'}]
        let market = undefined;
        if (symbol !== undefined) {
            market = this.safeValue (this.markets, symbol);
        }
        return this.parseOrders (response, market, since, limit, params);
    }

    parseOrder (order, market: Market = undefined): Order {
        const orderStatus = this.safeString (order, 'status');
        let status = undefined;
        if (orderStatus === 'Placed' || orderStatus === 'Active') {
            status = 'open';
        } else if (orderStatus === 'Failed') {
            status = 'canceled';
        } else if (orderStatus === 'Filled') {
            status = 'closed';
        }
        const orderType = this.safeString2 (order, 'type', 'orderType');
        let type = undefined;
        if (orderType !== undefined) {
            if (orderType === 'market') {
                type = 'market';
            } else if (orderType.indexOf ('limit')) {
                type = 'limit';
            }
        }
        const datetime = this.safeString2 (order, 'createdAt', 'orderCreatedAt');
        const updateDatetime = this.safeString2 (order, 'updatedAt', 'orderUpdatedAt');
        const result = {
            'id': this.safeString (order, 'orderId'),
            'clientOrderId': this.safeString (order, 'customerOrderId'),
            'timestamp': this.parse8601 (datetime),
            'datetime': datetime,
            'symbol': this.safeSymbol (this.safeString (order, 'currencyPair')),
            'type': type,
            'side': this.safeString (order, 'side'),
            'lastTradeTimestamp': undefined,
            'lastUpdateTimestamp': this.parse8601 (updateDatetime),
            'price': this.safeString (order, 'price'),
            'amount': this.safeString (order, 'originalQuantity'),
            'cost': undefined,
            'average': this.safeString (order, 'averagePrice'),
            'filled': undefined,
            'remaining': this.safeString (order, 'remainingQuantity'),
            'timeInForce': this.safeString (order, 'timeInForce'),
            'postOnly': undefined,
            'trades': undefined,
            'reduceOnly': this.safeValue (order, 'reduceOnly'),
            'triggerPrice': undefined,
            'takeProfitPrice': undefined,
            'stopLossPrice': undefined,
            'status': status,
            'fee': undefined,
            'info': order,
        };
        return this.safeOrder (result, market);
    }

    async createOrder (symbol: string, type: OrderType, side: OrderSide, amount: number, price: number = undefined, params = {}): Promise<Order> {
        await this.loadMarkets ();
        let response = undefined;
        this.checkRequiredSymbolAugument ('createOrder', symbol);
        const marketId = this.marketId (symbol);
        if (side !== 'buy' && side !== 'sell') {
            throw new InvalidOrder (this.id + ' createOrder() - "side" must be either "buy" or "sell".');
        }
        const body = {
            'side': side.toUpperCase (),
            'pair': marketId,
        };
        // Optional parameters
        if (this.safeString (params, 'customerOrderId')) {
            body['customerOrderId'] = this.safeString (params, 'customerOrderId');
        }
        if (this.safeString (params, 'allowMargin')) {
            body['allowMargin'] = this.safeString (params, 'allowMargin');
        }
        this.omit (params, [ 'allowMargin', 'customerOrderId' ]);
        if (type === 'market') {
            if (price) {
                body['quoteAmount'] = amount;
            } else {
                body['baseAmount'] = amount;
            }
            this.omit (params, [ 'baseAmount', 'quoteAmount' ]);
            response = await this.privatePostOrdersMarket (this.extend (body, params));
        } else if (type === 'limit') {
            body['price'] = this.numberToString (price);
            body['quantity'] = this.numberToString (amount);
            if (this.safeString (params, 'postOnly')) {
                body['postOnly'] = this.safeBool (params, 'postOnly');
                this.omit (params, 'postOnly');
            }
            response = await this.privatePostOrdersLimit (this.extend (body, params));
        } else {
            throw new InvalidOrder (this.id + ' createOrder() - "type" must be either "market" or "limit" to create an order.');
        }
        return this.parseOrder ({ 'orderId': this.safeString (response, 'id'), 'currencyPair': marketId });
    }

    async createOrders (orders: OrderRequest[], params = {}): Promise<Order[]> {
        await this.loadMarkets ();
        throw new NotSupported (this.id + ' createOrders() is not supported yet');
        // const response = await this.privatePostBatchOrders ()
    }

    async editOrder (id: string, symbol: string, type: OrderType, side: OrderSide, amount: number = undefined, price: number = undefined, params = {}): Promise<Order> {
        await this.loadMarkets ();
        await this.cancelOrder (id, symbol);
        return await this.createOrder (symbol, type, side, amount, price, params);
        // TODO: Method currently in Beta
        // await this.privatePutOrdersModify (this.entend (body, params));
    }

    async cancelOrder (id: string, symbol: string = undefined, params = {}): Promise<Order> {
        await this.loadMarkets ();
        this.checkRequiredSymbolAugument ('cancelOrder', symbol);
        const marketId = this.marketId (symbol);
        const orderFormat = {
            'orderId': id,
            'pair': marketId,
        };
        await this.privateDeleteOrdersOrder (this.extend (orderFormat, params));
        return this.parseOrder ({ 'id': id, 'currencyPair': marketId });
    }

    async cancelAllOrders (symbol: string = undefined, params = {}): Promise<Order[]> {
        await this.loadMarkets ();
        let response = undefined;
        if (symbol === undefined) {
            response = this.privateDeleteOrders (params);
        } else {
            this.checkRequiredSymbolAugument ('cancelAllOrders', symbol);
            const marketId = this.marketId (symbol);
            const body = {
                'pair': marketId,
            };
            response = await this.privateDeleteOrdersPair (this.extend (body, params));
            for (let i = 0; i < response.length; i++) {
                response[i]['currencyPair'] = marketId;
            }
        }
        return this.parseOrders (response);
    }

    async fetchTrades (symbol: string, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        await this.loadMarkets ();
        let response = undefined;
        this.checkRequiredSymbolAugument ('fetchTrades', symbol);
        params['pair'] = this.marketId (symbol);
        if (this.checkRequiredCredentials (false)) {
            response = await this.privateGetMarketdataPairTradehistory (params);
            // [
            //     {
            //       "price": "43023",
            //       "quantity": "0.01971316",
            //       "currencyPair": "BTCUSDC",
            //       "tradedAt": "2024-02-07T12:48:40.256Z",
            //       "takerSide": "sell",
            //       "sequenceId": 1204770707632816000,
            //       "id": "37e5fba7-c5b7-11ee-b1a8-c700095e5df0",
            //       "quoteVolume": "848.11928268"
            //     },
            //     {
            //       "price": "42909",
            //       "quantity": "0.00005173",
            //       "currencyPair": "BTCUSDC",
            //       "tradedAt": "2024-02-07T12:24:22.818Z",
            //       "takerSide": "buy",
            //       "sequenceId": 1204764594694783000,
            //       "id": "d33297ae-c5b3-11ee-b1a8-c700095e5df0",
            //       "quoteVolume": "2.21968257"
            //     },
            // ]
        } else {
            response = await this.publicGetPairTrades (params);
            // [
            //     {
            //       "price": "43064",
            //       "quantity": "0.00079928",
            //       "currencyPair": "BTCUSDC",
            //       "tradedAt": "2024-02-05T07:47:04.625Z",
            //       "takerSide": "sell",
            //       "sequenceId": 1203970033324130300,
            //       "id": "c13c5166-c3fa-11ee-b1a8-c700095e5df0",
            //       "quoteVolume": "34.42019392"
            //     },
            //     {
            //       "price": "43010",
            //       "quantity": "0.0001",
            //       "currencyPair": "BTCUSDC",
            //       "tradedAt": "2024-02-05T07:39:40.198Z",
            //       "takerSide": "buy",
            //       "sequenceId": 1203968169262186500,
            //       "id": "b8562435-c3f9-11ee-b1a8-c700095e5df0",
            //       "quoteVolume": "4.301"
            //     },
            // ]
        }
        return this.parseTrades (response, undefined, since, limit, params);
    }

    async fetchMyTrades (symbol: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        await this.loadMarkets ();
        this.checkRequiredSymbolAugument ('fetchMyTrades', symbol);
        params['pair'] = this.marketId (symbol);
        const response = await this.privateGetAccountPairTradehistory (params);
        // [
        //     {
        //       "price": "29001",
        //       "quantity": "0.00137926",
        //       "currencyPair": "BTCUSDC",
        //       "tradedAt": "2024-02-07T06:00:30.180Z",
        //       "side": "buy",
        //       "sequenceId": 1204667988813283300,
        //       "id": "32ad194e-c57e-11ee-9935-593da58a6690",
        //       "orderId": "3fda280f-e87e-44c8-babf-852da844e514",
        //       "fee": "0.000000413778",
        //       "feeCurrency": "BTC"
        //     },
        //     {'price': '19.3017',
        //     'quantity': '1',
        //     'currencyPair': 'USDCZAR',
        //     'tradedAt': '2024-02-27T14:46:44.852Z',
        //     'side': 'sell',
        //     'sequenceId': '1212048179894161409',
        //     'id': '06e88b34-d57f-11ee-92bb-d59de6d96a53',
        //     'orderId': '5ae9af1e-eb05-427e-af4f-50bcbd9dc8f1',
        //     'makerReward': '0.0001',
        //     'makerRewardCurrency': 'USDC'}
        // ]
        return this.parseTrades (response, undefined, since, limit, params);
    }

    parseTrade (trade: object, market: Market = undefined): Trade {
        const symbol = this.safeSymbol (this.safeString (trade, 'currencyPair'));
        const timestamp = this.parse8601 (this.safeString (trade, 'tradedAt'));
        let takerOrMaker = undefined;
        let feeCost = this.safeNumber2 (trade, 'fee', 'makerReward');
        // let tradeType = undefined;
        if (this.inArray ('makerReward', trade)) {
            takerOrMaker = 'maker';
            feeCost = (feeCost) ? -feeCost : feeCost;
        } else {
            takerOrMaker = 'taker';
        }
        const fee = {
            'currency': this.safeString2 (trade, 'feeCurrency', 'makerRewardCurrency'),
            'cost': feeCost,
            'rate': undefined,
        };
        return this.safeTrade ({
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.safeString (trade, 'tradedAt'),
            'id': this.safeString (trade, 'id'),
            'order': this.safeString (trade, 'orderId'),
            'symbol': symbol,
            'type': (takerOrMaker === 'taker') ? 'market' : 'limit',
            'side': this.safeString2 (trade, 'side', 'takerSide'),
            'amount': this.safeNumber (trade, 'quantity'),
            'price': this.safeNumber (trade, 'price'),
            'cost': this.safeNumber (trade, 'quoteVolume'),
            'takerOrMaker': takerOrMaker,
            'fee': fee,
        });
    }

    async fetchTradingFees (params = {}) {
        await this.loadMarkets ();
        const response = await this.privateGetAccountFeesTrade (params);
        if (!Array.isArray (response)) {
            throw new NullResponse (this.id + ' ' + 'fetchTradingFees() received incorrect response');
        }
        const result = {};
        for (let i = 0; i < response.length; i++) {
            const tradeFee = response[i];
            const symbol = this.safeSymbol (this.safeString (tradeFee, 'currencyPair'));
            const maker = this.safeNumber (tradeFee, 'makerPercentage');
            const taker = this.safeNumber (tradeFee, 'takerPercentage');
            result[symbol] = {
                'maker': (maker) ? maker / 100 : maker,
                'taker': (taker) ? taker / 100 : taker,
                'info': tradeFee,
                'symbol': symbol,
            };
        }
        return result;
        // todo: Let fetchTradingFee only returned symbol instead of all - requires update in Exchange.ts
        // todo: Update .market values with feeTrading values.
    }

    async loadTradingFees (params = {}) {
        await this.loadMarkets ();
        const tradingFees = await this.fetchTradingFees (params);
        const tradingFeesList = this.toArray (tradingFees);
        for (let i = 0; i < tradingFeesList.length; i++) {
            const tradeFee = tradingFeesList[i];
            const symbol = tradeFee['symbol'];
            if (this.inArray (symbol, this.markets)) {
                this.markets[symbol]['taker'] = tradeFee['taker'];
                this.markets[symbol]['maker'] = tradeFee['maker'];
            }
        }
    }

    async fetchDepositAddress (code: string, params = {}) {
        await this.loadMarkets ();
        this.checkRequiredCurrencyCodeAugument ('fetchDepositAddress', code);
        let response = undefined;
        const currency = this.safeCurrency (code);
        const currencyId = {
            'currency': currency['id'],
        };
        if (this.isFiat (code)) {
            response = await this.privateGetWalletFiatCurrencyDepositReference (this.extend (currencyId, params));
            // {'reference': 'USDGVVU6XR'}
        } else {
            response = await this.privateGetWalletCryptoCurrencyDepositAddress (this.extend (currencyId, params));
            // {'currency': 'BTC',
            // 'address': '3Af2LnWaUFS2wXmXQMugsEtnq7iJTEncfX',
            // 'networkType': 'Bitcoin'}
        }
        return this.parseDepositAddress (response, currency);
    }

    parseDepositAddress (depositAddress, currency: Currency = undefined) {
        const currencyId = this.safeString (currency, 'id');
        return {
            'currency': this.safeCurrencyCode (this.safeString (depositAddress, 'currency', currencyId)),
            'network': this.safeString (depositAddress, 'networkType'),
            'address': this.safeString2 (depositAddress, 'address', 'reference'),
            'tag': this.safeString (depositAddress, 'paymentReference'),
            'info': depositAddress,
        };
    }

    async fetchDeposits (code: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Transaction[]> {
        await this.loadMarkets ();
        this.checkRequiredCurrencyCodeAugument ('fetchDeposits', code);
        if (this.isFiat (code)) {
            throw new NotSupported (this.id + ' fetchDeposits() is not supported yet for fiat currencies');
        }
        const currency = this.safeCurrency (code);
        const currencyId = {
            'currency': currency['id'],
        };
        const response = await this.privateGetWalletCryptoCurrencyDepositHistory (this.extend (currencyId, params));
        // [
        //     {
        //       "currencyCode": "BTC",
        //       "receiveAddress": "2MvLmR6cd4YVDFAU8BTujKkzrV1dwFaNHup",
        //       "transactionHash": "fb588e3be006058c5853880421ef7241388270e2b506ce7ca553f8e5b797f628",
        //       "networkType": "Bitcoin",
        //       "amount": "0.01",
        //       "createdAt": "2019-03-01T14:36:53Z",
        //       "confirmations": 2,
        //       "confirmed": true,
        //       "confirmedAt": "2019-03-01T14:48:47.340347Z"
        //     },
        //     {
        //       "currencyCode": "BTC",
        //       "receiveAddress": "2MvLmR6cd4YVDFAU8BTujKkzrV1dwFaNHup",
        //       "transactionHash": "a0a70db6c1b2f84caa562e8523f0aaee83c73d1e9ff97e9ec2d6b36f4ad56f3e",
        //       "networkType": "Bitcoin",
        //       "amount": "0.11229885",
        //       "createdAt": "2019-01-11T08:54:20Z",
        //       "confirmations": 0,
        //       "confirmed": true,
        //       "confirmedAt": "2019-01-11T09:30:57.265843Z"
        //     }
        //   ]
        return this.parseTransactions (response);
        // Todo - Update Exchange.ts fetchDeposits argument from symbol to code parameter
    }

    async fetchWithdrawals (code: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Transaction[]> {
        await this.loadMarkets ();
        this.checkRequiredCurrencyCodeAugument ('fetchWithdrawals', code);
        if (this.isFiat (code)) {
            throw new NotSupported (this.id + ' fetchWithdrawals() is not supported yet for fiat currencies');
        }
        const currency = {
            'currency': this.safeCurrency (code)['id'],
        };
        const response = await this.privateGetWalletCryptoCurrencyWithdrawHistory (this.extend (currency, params));
        // [
        //     {
        //       "currency": "BTC",
        //       "address": "invalidAddress123",
        //       "amount": "0.0001",
        //       "feeAmount": "0.0002",
        //       "confirmations": 0,
        //       "uniqueId": "2ab9dfce-7818-4812-9b33-fee7bd7c7c5a",
        //       "createdAt": "2019-04-20T14:30:26.950Z",
        //       "verified": true,
        //       "status": "Failed",
        //       "networkType": "Bitcoin"
        //     },
        //     {
        //       "currency": "BTC",
        //       "address": "mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt",
        //       "amount": "0.19974963",
        //       "feeAmount": "0.0002",
        //       "transactionHash": "a79535cc38f515d1c3ecac364057521ffece9ed0ed11667ba2b83bcc8c065994",
        //       "confirmations": 2,
        //       "lastConfirmationAt": "2019-03-12T08:08:13.879189",
        //       "uniqueId": "a243daf8-cc5d-4e61-9618-433e0d4c79ac",
        //       "createdAt": "2019-03-11T10:36:23.739Z",
        //       "verified": true,
        //       "status": "Complete",
        //       "networkType": "Bitcoin"
        //     },
        //     {
        //       "currency": "BTC",
        //       "address": "mkuKgijS7w4hjWL3Zs7kw7HQvM85a2F8RZ",
        //       "amount": "0.01",
        //       "feeAmount": "0.00055",
        //       "transactionHash": "87d8701d3b241cc6a32b10388ad5c6f8cf9a9336d9e9fcd2592ad84b57473eb9",
        //       "confirmations": 2,
        //       "lastConfirmationAt": "2019-01-12T08:55:14.692649",
        //       "uniqueId": "be612be3-06e3-4214-b81e-9bf8e645c28a",
        //       "createdAt": "2019-01-11T12:56:21.080Z",
        //       "verified": true,
        //       "status": "Processing",
        //       "networkType": "Bitcoin"
        //     }
        //   ]
        return this.parseTransactions (response);
        // Todo - Update Exchange.ts fetchDeposits argument from symbol to code parameter
    }

    async withdraw (code: string, amount: number, address: string, tag = undefined, params = {}): Promise<Transaction> {
        await this.loadMarkets ();
        this.checkRequiredCurrencyCodeAugument ('fetchWithdrawals', code);
        const currency = this.safeCurrency (code);
        // todo: Include 'networkType' from default currency if none provided via params
        let response = undefined;
        if (this.isFiat (code)) {
            const withdrawalBody = {
                'currency': currency['id'],
                'linkedBankAccountId': address,
                'amount': this.numberToString (amount),
            };
            response = await this.privatePostWalletFiatCurrencyWithdraw (this.extend (withdrawalBody, params));
        } else {
            const withdrawalBody = {
                'currency': currency['id'],
                'address': address,
                'amount': this.numberToString (amount),
            };
            response = await this.privatePostWalletCryptoCurrencyWithdraw (this.extend (withdrawalBody, params));
        }
        return this.parseTransaction (response);
    }

    parseTransaction (transaction, currency: Currency = undefined): Transaction {
        const timestamp = this.parse8601 (this.safeString (transaction, 'createdAt'));
        const code = this.safeCurrencyCode (this.safeString (transaction, 'currencyCode'));
        let status = undefined;
        if (this.safeBool (transaction, 'confirmed')) {
            status = 'ok';
        }
        let transactionType = undefined;
        if (this.inArray ('receiveAddress', transaction)) {
            transactionType = 'deposit';
        }
        return {
            'info': transaction,
            'id': this.safeString (transaction, 'id'),
            'txid': this.safeString (transaction, 'transactionHash'),
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'address': this.safeString (transaction, 'receiveAddress'),
            'addressFrom': undefined,
            'addressTo': undefined,
            'tag': undefined,
            'tagFrom': undefined,
            'tagTo': undefined,
            'type': transactionType,
            'amount': this.safeNumber (transaction, 'amount'),
            'currency': code,
            'status': status,
            'updated': this.parse8601 (this.safeString (transaction, 'confirmedAt')),
            'fee': undefined,
            'network': this.safeString (transaction, 'networkType'),
            'comment': undefined,
            'internal': undefined,
        } as Transaction;
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const partialPath = this.implodeParams (path, params);
        let url = this.urls['api'][api] + '/' + partialPath;
        const query = this.omit (params, this.extractParams (path));
        if (Object.keys (query).length) {
            if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
                body = this.json (query);
            } else {
                url += '?' + this.urlencode (query);
            }
        }
        let signHeaders = undefined;
        if (body === undefined) {
            body = '';
        }
        if (api === 'private') {
            const full_path = '/v' + this.version + '/' + partialPath;
            this.checkRequiredCredentials ();
            const timestamp = this.milliseconds ().toString ();
            const message = timestamp + method.toUpperCase () + full_path + body;
            const payloadBase64 = this.stringToBase64 (message);
            const signature = this.hmac (
                this.base64ToBinary (payloadBase64),
                this.base64ToBinary (this.stringToBase64 (this.secret)),
                sha512,
                'hex'
            );
            signHeaders = {
                // 'Content-Type': 'application/json',
                'X-VALR-API-KEY': this.apiKey,
                'X-VALR-SIGNATURE': signature,
                'X-VALR-TIMESTAMP': timestamp,
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': this.deepExtend (headers, signHeaders) };
    }
}
