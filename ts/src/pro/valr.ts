//  ---------------------------------------------------------------------------

import valrRest from '../valr.js';
import { } from '../base/errors.js';
import { } from '../base/ws/Cache.js';
import { sha512 } from '../static_dependencies/noble-hashes/sha512.js';
import type { Balances, Ticker } from '../base/types.js';
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
                'watchTickers': false,
                'watchOrderBook': false,
                'watchTrades': false,
                'watchTradesForSymbols': false,
                'watchOrderBookForSymbols': false,
                'watchBalance': false,
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
        await this.loadMarkets ();
        const url = this.urls['api']['ws']['trade'];
        const marketId = this.marketId (symbol);
        const subscribeHash = [ marketId ];
        const message = {
            'type': 'SUBSCRIBE',
            'subscriptions': [
                {
                    'event': 'MARKET_SUMMARY_UPDATE',
                    'pairs': [ marketId ],
                },
            ],
        };
        const messageHashes = [ 'MARKET_SUMMARY_UPDATE:' + marketId ];
        this.authenticate (url);
        const ticker = await this.watchMultiple (url, messageHashes, message, subscribeHash);
        return ticker;
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
            'FULL_ORDERBOOK_UPDATE': this.log,
            'MARKET_SUMMARY_UPDATE': this.handleTicker,
            'NEW_TRADE_BUCKET': this.log,
            'NEW_TRADE': this.log,
            'MARK_PRICE_UPDATE': this.log,
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
            this.log (this.iso8601 (this.milliseconds ()), 'handleMessage: Default action.', message);
        }
    }

    authenticate (url) {
        if ((this.clients !== undefined) && (url in this.clients)) {
            return;
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
        this.client (url);
        this.options['ws']['options']['headers'] = originalHeaders;
    }
}

