'use strict'

const assert = require ('assert');
const testCommonItems = require ('./test.commonItems.js');
const Precise = require ('../../base/Precise');

function testBorrowRate (exchange, borrowRate, method, code) {
    const format = {
        'info': {}, // Or []
        'currency': 'USDT',
        'timestamp': 1638230400000,
        'datetime': '2021-11-30T00:00:00.000Z',
        'rate': exchange.parseNumber ('0.0006'), // Interest rate
        // 'period': 86400000, // Amount of time the interest rate is based on in milliseconds
    };
    const forceValues = [ 'currency', 'info', 'rate' ];
    testCommonItems.testStructureKeys (exchange, method, balance, format, forceValues);
    testCommonItems.testCommonTimestamp (exchange, method, borrowRate);
    const logText = testCommonItems.logTemplate (exchange, method, borrowRate);
    //
    // assert (borrowRate['period'] === 86400000 || borrowRate['period'] === 3600000) // Milliseconds in an hour or a day
    const rate = exchange.safeString (borrowRate, 'rate');
    assert (Precise.stringGt (rate, '0'), 'rate is excepted to be above zero' + logText);
}

module.exports = testBorrowRate;