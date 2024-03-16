using ccxt;
namespace Tests;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class testMainClass : BaseTest
{
    public static void testBalance(Exchange exchange, object skippedProperties, object method, object entry)
    {
        object format = new Dictionary<string, object>() {
            { "free", new Dictionary<string, object>() {} },
            { "used", new Dictionary<string, object>() {} },
            { "total", new Dictionary<string, object>() {} },
            { "info", new Dictionary<string, object>() {} },
        };
        testSharedMethods.assertStructure(exchange, skippedProperties, method, entry, format);
        object logText = testSharedMethods.logTemplate(exchange, method, entry);
        //
        object codesTotal = new List<object>(((IDictionary<string,object>)getValue(entry, "total")).Keys);
        object codesFree = new List<object>(((IDictionary<string,object>)getValue(entry, "free")).Keys);
        object codesUsed = new List<object>(((IDictionary<string,object>)getValue(entry, "used")).Keys);
        testSharedMethods.assertNonEmtpyArray(exchange, skippedProperties, method, codesTotal, "total");
        testSharedMethods.assertNonEmtpyArray(exchange, skippedProperties, method, codesFree, "free");
        testSharedMethods.assertNonEmtpyArray(exchange, skippedProperties, method, codesUsed, "used");
        object allCodes = exchange.arrayConcat(codesTotal, codesFree);
        allCodes = exchange.arrayConcat(allCodes, codesUsed);
        object codesLength = getArrayLength(codesTotal);
        object freeLength = getArrayLength(codesFree);
        object usedLength = getArrayLength(codesUsed);
        assert(isTrue((isEqual(codesLength, freeLength))) || isTrue((isEqual(codesLength, usedLength))), add("free and total and used codes have different lengths", logText));
        for (object i = 0; isLessThan(i, getArrayLength(allCodes)); postFixIncrement(ref i))
        {
            object code = getValue(allCodes, i);
            // testSharedMethods.assertCurrencyCode (exchange, skippedProperties, method, entry, code);
            assert(inOp(getValue(entry, "total"), code), add(add(add("code ", code), " not in total"), logText));
            assert(inOp(getValue(entry, "free"), code), add(add(add("code ", code), " not in free"), logText));
            assert(inOp(getValue(entry, "used"), code), add(add(add("code ", code), " not in used"), logText));
            object total = exchange.safeString(getValue(entry, "total"), code);
            object free = exchange.safeString(getValue(entry, "free"), code);
            object used = exchange.safeString(getValue(entry, "used"), code);
            assert(!isEqual(total, null), add("total is undefined", logText));
            assert(!isEqual(free, null), add("free is undefined", logText));
            assert(!isEqual(used, null), add("used is undefined", logText));
            assert(Precise.stringGe(total, "0"), add("total is not positive", logText));
            assert(Precise.stringGe(free, "0"), add("free is not positive", logText));
            assert(Precise.stringGe(used, "0"), add("used is not positive", logText));
            object sumFreeUsed = Precise.stringAdd(free, used);
            assert(Precise.stringEq(total, sumFreeUsed), add("free and used do not sum to total", logText));
        }
    }

}