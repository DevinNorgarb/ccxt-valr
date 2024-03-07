import os
import sys

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(root)

# ----------------------------------------------------------------------------

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

# ----------------------------------------------------------------------------
# -*- coding: utf-8 -*-

from ccxt.base.precise import Precise  # noqa E402
from ccxt.test.base import test_shared_methods  # noqa E402

def test_ticker(exchange, skipped_properties, method, entry, symbol):
    format = {
        'info': {},
        'symbol': 'ETH/BTC',
        'timestamp': 1502962946216,
        'datetime': '2017-09-01T00:00:00',
        'high': exchange.parse_number('1.234'),
        'low': exchange.parse_number('1.234'),
        'bid': exchange.parse_number('1.234'),
        'bidVolume': exchange.parse_number('1.234'),
        'ask': exchange.parse_number('1.234'),
        'askVolume': exchange.parse_number('1.234'),
        'vwap': exchange.parse_number('1.234'),
        'open': exchange.parse_number('1.234'),
        'close': exchange.parse_number('1.234'),
        'last': exchange.parse_number('1.234'),
        'previousClose': exchange.parse_number('1.234'),
        'change': exchange.parse_number('1.234'),
        'percentage': exchange.parse_number('1.234'),
        'average': exchange.parse_number('1.234'),
        'baseVolume': exchange.parse_number('1.234'),
        'quoteVolume': exchange.parse_number('1.234'),
    }
    # todo: atm, many exchanges fail, so temporarily decrease stict mode
    empty_allowed_for = ['timestamp', 'datetime', 'open', 'high', 'low', 'close', 'last', 'ask', 'bid', 'bidVolume', 'askVolume', 'baseVolume', 'quoteVolume', 'previousClose', 'vwap', 'change', 'percentage', 'average']
    test_shared_methods.assert_structure(exchange, skipped_properties, method, entry, format, empty_allowed_for)
    test_shared_methods.assert_timestamp_and_datetime(exchange, skipped_properties, method, entry)
    log_text = test_shared_methods.log_template(exchange, method, entry)
    #
    test_shared_methods.assert_greater(exchange, skipped_properties, method, entry, 'open', '0')
    test_shared_methods.assert_greater(exchange, skipped_properties, method, entry, 'high', '0')
    test_shared_methods.assert_greater(exchange, skipped_properties, method, entry, 'low', '0')
    test_shared_methods.assert_greater(exchange, skipped_properties, method, entry, 'close', '0')
    test_shared_methods.assert_greater(exchange, skipped_properties, method, entry, 'ask', '0')
    test_shared_methods.assert_greater_or_equal(exchange, skipped_properties, method, entry, 'askVolume', '0')
    test_shared_methods.assert_greater(exchange, skipped_properties, method, entry, 'bid', '0')
    test_shared_methods.assert_greater_or_equal(exchange, skipped_properties, method, entry, 'bidVolume', '0')
    test_shared_methods.assert_greater(exchange, skipped_properties, method, entry, 'vwap', '0')
    test_shared_methods.assert_greater(exchange, skipped_properties, method, entry, 'average', '0')
    test_shared_methods.assert_greater_or_equal(exchange, skipped_properties, method, entry, 'baseVolume', '0')
    test_shared_methods.assert_greater_or_equal(exchange, skipped_properties, method, entry, 'quoteVolume', '0')
    last_string = exchange.safe_string(entry, 'last')
    close_string = exchange.safe_string(entry, 'close')
    assert ((close_string is None) and (last_string is None)) or Precise.string_eq(last_string, close_string), '`last` != `close`' + log_text
    base_volume = exchange.safe_string(entry, 'baseVolume')
    quote_volume = exchange.safe_string(entry, 'quoteVolume')
    high = exchange.safe_string(entry, 'high')
    low = exchange.safe_string(entry, 'low')
    if not ('quoteVolume' in skipped_properties) and not ('baseVolume' in skipped_properties):
        if (base_volume is not None) and (quote_volume is not None) and (high is not None) and (low is not None):
            assert Precise.string_ge(quote_volume, Precise.string_mul(base_volume, low)), 'quoteVolume >= baseVolume * low' + log_text
            assert Precise.string_le(quote_volume, Precise.string_mul(base_volume, high)), 'quoteVolume <= baseVolume * high' + log_text
    vwap = exchange.safe_string(entry, 'vwap')
    if vwap is not None:
        # todo
        # assert (high !== undefined, 'vwap is defined, but high is not' + logText);
        # assert (low !== undefined, 'vwap is defined, but low is not' + logText);
        # assert (vwap >= low && vwap <= high)
        assert Precise.string_ge(vwap, '0'), 'vwap is not greater than zero' + log_text
        if base_volume is not None:
            assert quote_volume is not None, 'baseVolume & vwap is defined, but quoteVolume is not' + log_text
        if quote_volume is not None:
            assert base_volume is not None, 'quoteVolume & vwap is defined, but baseVolume is not' + log_text
    if not ('spread' in skipped_properties) and not ('ask' in skipped_properties) and not ('bid' in skipped_properties):
        ask_string = exchange.safe_string(entry, 'ask')
        bid_string = exchange.safe_string(entry, 'bid')
        if (ask_string is not None) and (bid_string is not None):
            test_shared_methods.assert_greater(exchange, skipped_properties, method, entry, 'ask', exchange.safe_string(entry, 'bid'))
    test_shared_methods.assert_symbol(exchange, skipped_properties, method, entry, 'symbol', symbol)
