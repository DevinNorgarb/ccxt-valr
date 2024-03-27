//  ---------------------------------------------------------------------------

import valrRest from '../valr.js';
import { ArgumentsRequired } from '../base/errors.js';
import { } from '../base/ws/Cache.js';
import { sha512 } from '../static_dependencies/noble-hashes/sha512.js';
import type { Balances, Ticker, Tickers } from '../base/types.js';
import Client from '../base/ws/Client.js';
import { } from '../base/ws/OrderBook.js';
import Precise from '../base/Precise.js';

//  ---------------------------------------------------------------------------

export default class valr extends valrRest {
    describe () {
        return this.deepExtend (super.describe (), {
            'has': {
                'ws': true,
                'watchTicker': true,
                'watchTickers': true,
                'watchOrderBook': false,
                'watchTrades': false,
                'watchTradesForSymbols': false,
                'watchOrderBookForSymbols': false,
                'watchBalance': true,
                'watchOHLCV': false,
                'watchOHLCVForSymbols': false,
                'watchOrders': false,
                'watchMyTrades': false,
                'watchPositions': false,
                'createOrderWs': false,
                'editOrderWs': false,
                'cancelOrderWs': false,
                'cancelOrdersWs': false,
                'cancelAllOrdersWs': false,
            },
            'urls': {
                'api': {
                    'ws': {
                        'trade': 'wss://api.valr.com/ws/trade',
                        'account': 'wss://api.valr.com/ws/account',
                    },
                },
            },
            'options': {
            },
            'streaming': {
                'keepAlive': 30000,
            },
        });
    }

    async watchTicker (symbol: string, params = {}): Promise<Ticker> {
        this.checkRequiredSymbolAugument ('watchTicker', symbol);
        const tickers = await this.watchTickers ([ symbol ]);
        return this.safeValue (tickers, symbol);
    }

    async watchTickers (symbols: string[] = undefined, params = {}): Promise<Tickers> {
        await this.loadMarkets ();
        const marketIds = this.marketIds (symbols);
        if (symbols === undefined || marketIds === undefined) {
            throw new ArgumentsRequired (this.id + ' watchTickers() requires valid symbol list');
        }
        const url = this.urls['api']['ws']['trade'];
        const client = this.authenticate (url);
        const messageHashes = [];
        for (let i = 0; i < marketIds.length; i++) {
            messageHashes.push ('MARKET_SUMMARY_UPDATE:' + marketIds[i]);
        }
        const subscriptionHashes = Object.keys (client.subscriptions);
        for (let i = 0; i < subscriptionHashes.length; i++) {
            const subscriptionHash = subscriptionHashes[i];
            if (subscriptionHash.indexOf ('MARKET_SUMMARY_UPDATE:') >= 0) {
                const subMarketId = this.safeString (subscriptionHash.split (':'), 1);
                if (subMarketId && !this.inArray (subMarketId, marketIds)) {
                    marketIds.push (subMarketId);
                }
            }
        }
        const message = {
            'type': 'SUBSCRIBE',
            'subscriptions': [
                {
                    'event': 'MARKET_SUMMARY_UPDATE',
                    'pairs': marketIds,
                },
            ],
        };
        const ticker = await this.watchMultiple (url, messageHashes, message, messageHashes);
        const symbol = this.safeString (ticker, 'symbol');
        const tickers = {};
        tickers[symbol] = ticker;
        return tickers;
    }

    handleTicker (client: Client, message) {
        const updateType = this.safeString (message, 'type');
        const currencyPair = this.safeString (message, 'currencyPairSymbol');
        const messageHash = updateType + ':' + currencyPair;
        const tickerWs = this.safeValue (message, 'data');
        // {
        //     "type": "MARKET_SUMMARY_UPDATE",
        //     "currencyPairSymbol": "BTCZAR",
        //     "data":
        //     {
        //         "currencyPairSymbol": "BTCZAR",
        //         "askPrice": "1291722",
        //         "bidPrice": "1291721",
        //         "lastTradedPrice": "1291722",
        //         "previousClosePrice": "1262175",
        //         "baseVolume": "18.03385304",
        //         "quoteVolume": "22799989.56979442",
        //         "highPrice": "1293659",
        //         "lowPrice": "1243091",
        //         "created": "2024-03-24T21:49:08.217Z",
        //         "changeFromPrevious": "2.34",
        //         "markPrice": "1291638"
        //     }
        // }
        const marketId = this.safeString (message, 'currencyPairSymbol');
        const symbol = this.symbol (marketId);
        const ticker = this.parseTicker (tickerWs);
        this.tickers[symbol] = ticker;
        client.resolve (ticker, messageHash);
    }

    async watchBalance (params = {}): Promise<Balances> {
        await this.loadMarkets ();
        const url = this.urls['api']['ws']['account'];
        const messageHashes = [
            'NEW_ACCOUNT_HISTORY_RECORD',
            'BALANCE_UPDATE',
            // 'NEW_ACCOUNT_TRADE',
            // 'INSTANT_ORDER_COMPLETED',
            // 'OPEN_ORDERS_UPDATE',
            // 'OPEN_ORDERS_UPDATE',
            // 'MODIFY_ORDER_OUTCOME',
            // 'ORDER_PROCESSED',
            // 'ORDER_STATUS_UPDATE',
            // 'FAILED_CANCEL_ORDER',
            // 'NEW_PENDING_RECEIVE',
            // 'SEND_STATUS_UPDATE',
        ];
        this.authenticate (url);
        const balances = await this.watchMultiple (url, messageHashes);
        return balances as Balances;
    }

    handleBalance (client: Client, message) {
        const data = this.safeValue (message, 'data');
        const updateType = this.safeString (message, 'type');
        const balance = this.parseWsBalance (data);
        // {
        //     "type": "BALANCE_UPDATE",
        //     "data":
        //     {
        //         "currency":
        //         {
        //             "symbol": "R",
        //             "decimalPlaces": 2,
        //             "isActive": "True",
        //             "shortName": "ZAR",
        //             "longName": "Rand",
        //             "supportedWithdrawDecimalPlaces": 2,
        //             "collateral": "True",
        //             "collateralWeight": "0.99"
        //         },
        //         "available": "1022.05",
        //         "reserved": "10",
        //         "total": "1032.05",
        //         "updatedAt": "2024-03-25T15:38:48.580Z",
        //         "lendReserved": "0",
        //         "borrowCollateralReserved": "0",
        //         "borrowedAmount": "0",
        //         "totalInReference": "53.31359999",
        //         "totalInReferenceWeighted": "52.7804639901",
        //         "referenceCurrency": "USDC"
        //     }
        // }
        this.balance = this.extend (balance, this.balance);
        client.resolve (balance, updateType);
    }

    parseWsBalance (balanceWs) {
        const currency = this.safeValue (balanceWs, 'currency');
        const code = this.safeCurrencyCode (this.safeString (currency, 'shortName'));
        const result = {
            'timestamp': this.parse8601 (this.safeString (currency, 'updateAt')),
            'datetime': this.safeString (currency, 'updateAt'),
            'info': balanceWs,
        };
        const debt = Precise.stringAdd (
            this.safeString (balanceWs, 'lendReserved'),
            this.safeString (balanceWs, 'borrowReserved')
        );
        result[code] = {
            'free': this.safeFloat (balanceWs, 'available'),
            'used': this.safeFloat (balanceWs, 'reserved'),
            'total': this.safeFloat (balanceWs, 'total'),
            'debt': debt,
        };
        return this.safeBalance (result);
    }

    ping (client: Client) {
        return { 'type': 'PING' };
    }

    handlePong (client: Client, message) {
        client.lastPong = this.milliseconds ();
        // {'type': 'PONG'}
        if (this.verbose) {
            this.log (this.iso8601 (client.lastPong), 'handlePong', client.url, message);
        }
        return message;
    }

    handleMessage (client: Client, message) {
        if (message === '') {
            this.log (this.iso8601 (this.microseconds ()), 'Empty Message');
            return;
        }
        const methods = {
            'AGGREGATED_ORDERBOOK_UPDATE': this.log,
            // {"type":"AGGREGATED_ORDERBOOK_UPDATE","currencyPairSymbol":"PYUSDUSDT","data":{"Asks":[{"side":"sell","quantity":"495.26","price":"0.99735","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"sell","quantity":"11352.38","price":"0.99775","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"sell","quantity":"11925.87","price":"0.99825","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"sell","quantity":"11896.23","price":"1.00325","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"sell","quantity":"11964.45","price":"1.00827","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"sell","quantity":"9518.68","price":"1.01332","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"sell","quantity":"2.72","price":"9699.99999","currencyPair":"PYUSDUSDT","orderCount":2}],"Bids":[{"side":"buy","quantity":"498.38","price":"0.99727","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"buy","quantity":"11316.78","price":"0.99687","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"buy","quantity":"11964.06","price":"0.99637","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"buy","quantity":"11991.24","price":"0.99138","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"buy","quantity":"11979.87","price":"0.98642","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"buy","quantity":"11915.87","price":"0.98148","currencyPair":"PYUSDUSDT","orderCount":1},{"side":"buy","quantity":"20809.99","price":"0.00159","currencyPair":"PYUSDUSDT","orderCount":1}],"LastChange":"2024-03-27T12:39:52.562Z","SequenceNumber":173347}}
            'FULL_ORDERBOOK_UPDATE': this.log,
            // {"type":"FULL_ORDERBOOK_UPDATE","currencyPairSymbol":"PYUSDUSDT","data":{"LastChange":1711543154427,"Asks":[{"Price":"0.99732","Orders":[{"orderId":"041200ae-2849-4660-93bd-ff6b8d1ebd39","quantity":"0"}]},{"Price":"0.99766","Orders":[{"orderId":"b6c577f1-bf4d-4963-9e9e-aa87499ee93c","quantity":"0"}]},{"Price":"0.99816","Orders":[{"orderId":"3d9ed086-0079-4cda-b052-5fbbf5fd6966","quantity":"0"}]},{"Price":"1.00315","Orders":[{"orderId":"992b1ba2-0a58-404f-9710-2fa617a908fe","quantity":"0"}]},{"Price":"1.00817","Orders":[{"orderId":"f0b97400-f7ed-43f1-be48-6097e71e5a25","quantity":"0"}]},{"Price":"1.01321","Orders":[{"orderId":"82555657-3968-42e7-b4d2-b9866b2e59aa","quantity":"0"}]}],"Bids":[{"Price":"0.99726","Orders":[{"orderId":"cb1a92fa-0db4-42db-bca8-0fee32cdfc8d","quantity":"0"}]},{"Price":"0.99678","Orders":[{"orderId":"8d4a8efd-f871-40d6-8c63-576d20e7777c","quantity":"0"}]},{"Price":"0.99628","Orders":[{"orderId":"517a2a39-dfe9-4605-938b-4564313012a4","quantity":"0"}]},{"Price":"0.99129","Orders":[{"orderId":"e4851eeb-25d4-4383-891c-7361c3e1bb10","quantity":"0"}]},{"Price":"0.98633","Orders":[{"orderId":"6a45081f-37e3-4977-9e91-68a95505698f","quantity":"0"}]},{"Price":"0.98139","Orders":[{"orderId":"6837f9fb-f4fc-434a-914b-0e25e9d1585a","quantity":"0"}]}],"SequenceNumber":173335,"Checksum":492550141}}
            'MARKET_SUMMARY_UPDATE': this.handleTicker,
            'NEW_TRADE_BUCKET': this.log,
            // { "type": "NEW_TRADE_BUCKET", "currencyPairSymbol": "BTCZAR", "data": { "currencyPairSymbol": "BTCZAR", "bucketPeriodInSeconds": 300, "startTime": "2024-03-27T12:25:00Z", "open": "1359400", "high": "1359976", "low": "1358706", "close": "1359063", "volume": "0.05533505", "quoteVolume": "75211.39828681" } }
            'NEW_TRADE': this.log,
            // {"type":"NEW_TRADE","currencyPairSymbol":"BTCZAR","data":{"price":"1360468","quantity":"0.0004402","currencyPair":"BTCZAR","tradedAt":"2024-03-27T12:33:19.918Z","takerSide":"buy","id":"31934cc3-ec36-11ee-92bb-8f9d774e71b6"}}
            'MARK_PRICE_UPDATE': this.log,
            // Used for instant buy/sell orders not for exchange.
            // {"type":"MARK_PRICE_UPDATE","currencyPairSymbol":"BTCZAR","data":{"price":"1360201"}}
            'PONG': this.handlePong,
            'BALANCE_UPDATE': this.handleBalance,
        };
        const eventType = this.safeString (message, 'type');
        const method = this.safeValue (methods, eventType);
        // const subscriptions = Object.values (client.subscriptions);
        // const messageHash = Object.values (client.messageHash)
        if (method) {
            if (client.verbose) {
                this.log (this.iso8601 (this.milliseconds ()), 'handleMessage method:', method, 'eventType: ', eventType);
            }
            method.call (this, client, message);
        } else {
            this.log (this.iso8601 (this.milliseconds ()), 'handleMessage: Unknown message.', message);
        }
    }

    authenticate (url) {
        if ((this.clients !== undefined) && (url in this.clients)) {
            return this.client (url);
        }
        this.checkRequiredCredentials ();
        const timestamp = this.milliseconds ().toString ();
        const urlParts = url.split ('/');
        const partsLength = urlParts.length;
        const path = '/' + this.safeString (urlParts, partsLength - 2) + '/' + this.safeString (urlParts, partsLength - 1);
        const message = timestamp + 'GET' + path;
        const payloadBase64 = this.stringToBase64 (message);
        const signature = this.hmac (
            this.base64ToBinary (payloadBase64),
            this.base64ToBinary (this.stringToBase64 (this.secret)),
            sha512,
            'hex'
        );
        // Can't pass headers directly to this.client. Use this.options['ws'] instead.
        const defaultOptions = {
            'ws': {
                'options': {
                    'headers': {},
                },
            },
        };
        this.options = this.extend (defaultOptions, this.options);
        const originalHeaders = this.options['ws']['options']['headers'];
        const headers = {
            'X-VALR-API-KEY': this.apiKey,
            'X-VALR-SIGNATURE': signature,
            'X-VALR-TIMESTAMP': timestamp,
        };
        this.options['ws']['options']['headers'] = headers;
        const client = this.client (url);
        this.options['ws']['options']['headers'] = originalHeaders;
        return client;
    }
}

