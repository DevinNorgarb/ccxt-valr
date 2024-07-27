import assert from 'assert';
import testOrder from './base/test.order.js';
import testSharedMethods from './base/test.sharedMethods.js';
async function testFetchOrders(exchange, skippedProperties, symbol) {
    const method = 'fetchOrders';
    const orders = await exchange.fetchOrders(symbol);
    assert(Array.isArray(orders), exchange.id + ' ' + method + ' must return an array, returned ' + exchange.json(orders));
    testSharedMethods.assertNonEmtpyArray(exchange, skippedProperties, method, orders, symbol);
    const now = exchange.milliseconds();
    for (let i = 0; i < orders.length; i++) {
        testOrder(exchange, skippedProperties, method, orders[i], symbol, now);
    }
    testSharedMethods.assertTimestampOrder(exchange, method, symbol, orders);
}
export default testFetchOrders;
