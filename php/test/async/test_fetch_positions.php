<?php
namespace ccxt;

// ----------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -----------------------------------------------------------------------------
use React\Async;
use React\Promise;
include_once PATH_TO_CCXT . '/test/base/test_position.php';
include_once PATH_TO_CCXT . '/test/base/test_shared_methods.php';

function test_fetch_positions($exchange, $skipped_properties, $symbol) {
    return Async\async(function () use ($exchange, $skipped_properties, $symbol) {
        $method = 'fetchPositions';
        $now = $exchange->milliseconds();
        // without symbol
        $positions = Async\await($exchange->fetch_positions());
        assert_non_emtpy_array($exchange, $skipped_properties, $method, $positions, $symbol);
        for ($i = 0; $i < count($positions); $i++) {
            test_position($exchange, $skipped_properties, $method, $positions[$i], null, $now);
        }
        // testSharedMethods.assertTimestampOrder (exchange, method, undefined, positions); // currently order of positions does not make sense
        // with symbol
        $positions_for_symbol = Async\await($exchange->fetch_positions([$symbol]));
        assert(gettype($positions_for_symbol) === 'array' && array_keys($positions_for_symbol) === array_keys(array_keys($positions_for_symbol)), $exchange->id . ' ' . $method . ' must return an array, returned ' . $exchange->json($positions_for_symbol));
        $positions_for_symbol_length = count($positions_for_symbol);
        assert($positions_for_symbol_length <= 4, $exchange->id . ' ' . $method . ' positions length for particular symbol should be less than 4, returned ' . $exchange->json($positions_for_symbol));
        for ($i = 0; $i < count($positions_for_symbol); $i++) {
            test_position($exchange, $skipped_properties, $method, $positions_for_symbol[$i], $symbol, $now);
        }
    }) ();
}
