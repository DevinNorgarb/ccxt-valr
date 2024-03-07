using ccxt;
namespace Tests;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class testMainClass : BaseTest
{
    async static public Task testFetchMarginModes(Exchange exchange, object skippedProperties, object symbol)
    {
        object method = "fetchMarginModes";
        object marginModes = await exchange.fetchMarginModes(symbol);
        assert((marginModes is IDictionary<string, object>), add(add(add(add(add(add(exchange.id, " "), method), " "), symbol), " must return an object. "), exchange.json(marginModes)));
        object marginModeKeys = new List<object>(((IDictionary<string,object>)marginModes).Keys);
        object arrayLength = getArrayLength(marginModeKeys);
        assert(isGreaterThanOrEqual(arrayLength, 1), add(add(add(add(add(add(exchange.id, " "), method), " "), symbol), " must have at least one entry. "), exchange.json(marginModes)));
        for (object i = 0; isLessThan(i, arrayLength); postFixIncrement(ref i))
        {
            object marginModesForSymbol = getValue(marginModes, getValue(marginModeKeys, i));
            object arrayLengthSymbol = getArrayLength(marginModesForSymbol);
            assert(isGreaterThanOrEqual(arrayLengthSymbol, 1), add(add(add(add(add(add(exchange.id, " "), method), " "), symbol), " must have at least one entry. "), exchange.json(marginModes)));
            for (object j = 0; isLessThan(j, getArrayLength(marginModesForSymbol)); postFixIncrement(ref j))
            {
                testMarginMode(exchange, skippedProperties, method, getValue(marginModesForSymbol, j));
            }
        }
    }

}