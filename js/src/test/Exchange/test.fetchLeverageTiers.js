// ----------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code
// EDIT THE CORRESPONDENT .ts FILE INSTEAD

import assert from 'assert';
import testLeverageTier from './base/test.leverageTier.js';
import testSharedMethods from './base/test.sharedMethods.js';
async function testFetchLeverageTiers(exchange, skippedProperties, symbol) {
    const method = 'fetchLeverageTiers';
    const tiers = await exchange.fetchLeverageTiers(symbol);
    // const format = {
    //     'RAY/USDT': [
    //       {},
    //     ],
    // };
    assert(typeof tiers === 'object', exchange.id + ' ' + method + ' ' + symbol + ' must return an object. ' + exchange.json(tiers));
    const tierKeys = Object.keys(tiers);
    testSharedMethods.assertNonEmtpyArray(exchange, skippedProperties, method, tierKeys, symbol);
    for (let i = 0; i < tierKeys.length; i++) {
        const tiersForSymbol = tiers[tierKeys[i]];
        testSharedMethods.assertNonEmtpyArray(exchange, skippedProperties, method, tiersForSymbol, symbol);
        for (let j = 0; j < tiersForSymbol.length; j++) {
            testLeverageTier(exchange, skippedProperties, method, tiersForSymbol[j]);
        }
    }
}
export default testFetchLeverageTiers;
