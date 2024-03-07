import os
import sys

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(root)

# ----------------------------------------------------------------------------

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

# ----------------------------------------------------------------------------
# -*- coding: utf-8 -*-

from ccxt.test.base import test_margin_mode  # noqa E402

def test_fetch_margin_modes(exchange, skipped_properties, symbol):
    method = 'fetchMarginModes'
    margin_modes = exchange.fetch_margin_modes(symbol)
    assert isinstance(margin_modes, dict), exchange.id + ' ' + method + ' ' + symbol + ' must return an object. ' + exchange.json(margin_modes)
    margin_mode_keys = list(margin_modes.keys())
    array_length = len(margin_mode_keys)
    assert array_length >= 1, exchange.id + ' ' + method + ' ' + symbol + ' must have at least one entry. ' + exchange.json(margin_modes)
    for i in range(0, array_length):
        margin_modes_for_symbol = margin_modes[margin_mode_keys[i]]
        array_length_symbol = len(margin_modes_for_symbol)
        assert array_length_symbol >= 1, exchange.id + ' ' + method + ' ' + symbol + ' must have at least one entry. ' + exchange.json(margin_modes)
        for j in range(0, len(margin_modes_for_symbol)):
            test_margin_mode(exchange, skipped_properties, method, margin_modes_for_symbol[j])
