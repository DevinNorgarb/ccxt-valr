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
            'urls': {
                // 'logo': 'https://example.com/image.jpg',
                'api': {
                    'public': 'https://api.valr.com/v1/public',
                    'private': 'https://api.valr.com/v1',
                },
                'www': 'https://www.valr.com',
                'doc': [
                    'https://docs.valr.com/',
                ],
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
