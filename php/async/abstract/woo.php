<?php

namespace ccxt\async\abstract;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


abstract class woo extends \ccxt\async\Exchange {
    public function v1_pub_get_hist_kline($params = array()) {
        return $this->request('hist/kline', array('v1', 'pub'), 'GET', $params, null, null, array("cost" => 10));
    }
    public function v1_pub_get_hist_trades($params = array()) {
        return $this->request('hist/trades', array('v1', 'pub'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_info($params = array()) {
        return $this->request('info', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_info_symbol($params = array()) {
        return $this->request('info/{symbol}', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_system_info($params = array()) {
        return $this->request('system_info', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_market_trades($params = array()) {
        return $this->request('market_trades', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_token($params = array()) {
        return $this->request('token', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_token_network($params = array()) {
        return $this->request('token_network', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_funding_rates($params = array()) {
        return $this->request('funding_rates', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_funding_rate_symbol($params = array()) {
        return $this->request('funding_rate/{symbol}', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_funding_rate_history($params = array()) {
        return $this->request('funding_rate_history', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_futures($params = array()) {
        return $this->request('futures', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_futures_symbol($params = array()) {
        return $this->request('futures/{symbol}', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_orderbook_symbol($params = array()) {
        return $this->request('orderbook/{symbol}', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_public_get_kline($params = array()) {
        return $this->request('kline', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_private_get_client_token($params = array()) {
        return $this->request('client/token', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_private_get_order_oid($params = array()) {
        return $this->request('order/{oid}', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_private_get_client_order_client_order_id($params = array()) {
        return $this->request('client/order/{client_order_id}', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_private_get_orders($params = array()) {
        return $this->request('orders', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_private_get_client_trade_tid($params = array()) {
        return $this->request('client/trade/{tid}', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_private_get_order_oid_trades($params = array()) {
        return $this->request('order/{oid}/trades', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_private_get_client_trades($params = array()) {
        return $this->request('client/trades', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1_private_get_client_info($params = array()) {
        return $this->request('client/info', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1_private_get_asset_deposit($params = array()) {
        return $this->request('asset/deposit', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 10));
    }
    public function v1_private_get_asset_history($params = array()) {
        return $this->request('asset/history', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1_private_get_sub_account_all($params = array()) {
        return $this->request('sub_account/all', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1_private_get_sub_account_assets($params = array()) {
        return $this->request('sub_account/assets', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1_private_get_token_interest($params = array()) {
        return $this->request('token_interest', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1_private_get_token_interest_token($params = array()) {
        return $this->request('token_interest/{token}', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1_private_get_interest_history($params = array()) {
        return $this->request('interest/history', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1_private_get_interest_repay($params = array()) {
        return $this->request('interest/repay', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1_private_get_funding_fee_history($params = array()) {
        return $this->request('funding_fee/history', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 30));
    }
    public function v1_private_get_positions($params = array()) {
        return $this->request('positions', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 3.33));
    }
    public function v1_private_get_position_symbol($params = array()) {
        return $this->request('position/{symbol}', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 3.33));
    }
    public function v1_private_get_client_transaction_history($params = array()) {
        return $this->request('client/transaction_history', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1_private_post_order($params = array()) {
        return $this->request('order', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 5));
    }
    public function v1_private_post_asset_main_sub_transfer($params = array()) {
        return $this->request('asset/main_sub_transfer', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 30));
    }
    public function v1_private_post_asset_withdraw($params = array()) {
        return $this->request('asset/withdraw', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 30));
    }
    public function v1_private_post_interest_repay($params = array()) {
        return $this->request('interest/repay', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 60));
    }
    public function v1_private_post_client_account_mode($params = array()) {
        return $this->request('client/account_mode', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 120));
    }
    public function v1_private_post_client_leverage($params = array()) {
        return $this->request('client/leverage', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 120));
    }
    public function v1_private_delete_order($params = array()) {
        return $this->request('order', array('v1', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v1_private_delete_client_order($params = array()) {
        return $this->request('client/order', array('v1', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v1_private_delete_orders($params = array()) {
        return $this->request('orders', array('v1', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v1_private_delete_asset_withdraw($params = array()) {
        return $this->request('asset/withdraw', array('v1', 'private'), 'DELETE', $params, null, null, array("cost" => 120));
    }
    public function v2_private_get_client_holding($params = array()) {
        return $this->request('client/holding', array('v2', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v3_private_get_algo_order_oid($params = array()) {
        return $this->request('algo/order/{oid}', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v3_private_get_algo_orders($params = array()) {
        return $this->request('algo/orders', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v3_private_get_balances($params = array()) {
        return $this->request('balances', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v3_private_get_accountinfo($params = array()) {
        return $this->request('accountinfo', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v3_private_get_positions($params = array()) {
        return $this->request('positions', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 3.33));
    }
    public function v3_private_get_buypower($params = array()) {
        return $this->request('buypower', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v3_private_post_algo_order($params = array()) {
        return $this->request('algo/order', array('v3', 'private'), 'POST', $params, null, null, array("cost" => 5));
    }
    public function v3_private_put_order_oid($params = array()) {
        return $this->request('order/{oid}', array('v3', 'private'), 'PUT', $params, null, null, array("cost" => 2));
    }
    public function v3_private_put_order_client_client_order_id($params = array()) {
        return $this->request('order/client/{client_order_id}', array('v3', 'private'), 'PUT', $params, null, null, array("cost" => 2));
    }
    public function v3_private_put_algo_order_oid($params = array()) {
        return $this->request('algo/order/{oid}', array('v3', 'private'), 'PUT', $params, null, null, array("cost" => 2));
    }
    public function v3_private_put_algo_order_client_client_order_id($params = array()) {
        return $this->request('algo/order/client/{client_order_id}', array('v3', 'private'), 'PUT', $params, null, null, array("cost" => 2));
    }
    public function v3_private_delete_algo_order_order_id($params = array()) {
        return $this->request('algo/order/{order_id}', array('v3', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v3_private_delete_algo_orders_pending($params = array()) {
        return $this->request('algo/orders/pending', array('v3', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v3_private_delete_algo_orders_pending_symbol($params = array()) {
        return $this->request('algo/orders/pending/{symbol}', array('v3', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v3_private_delete_orders_pending($params = array()) {
        return $this->request('orders/pending', array('v3', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v1PubGetHistKline($params = array()) {
        return $this->request('hist/kline', array('v1', 'pub'), 'GET', $params, null, null, array("cost" => 10));
    }
    public function v1PubGetHistTrades($params = array()) {
        return $this->request('hist/trades', array('v1', 'pub'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetInfo($params = array()) {
        return $this->request('info', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetInfoSymbol($params = array()) {
        return $this->request('info/{symbol}', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetSystemInfo($params = array()) {
        return $this->request('system_info', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetMarketTrades($params = array()) {
        return $this->request('market_trades', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetToken($params = array()) {
        return $this->request('token', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetTokenNetwork($params = array()) {
        return $this->request('token_network', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetFundingRates($params = array()) {
        return $this->request('funding_rates', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetFundingRateSymbol($params = array()) {
        return $this->request('funding_rate/{symbol}', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetFundingRateHistory($params = array()) {
        return $this->request('funding_rate_history', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetFutures($params = array()) {
        return $this->request('futures', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetFuturesSymbol($params = array()) {
        return $this->request('futures/{symbol}', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetOrderbookSymbol($params = array()) {
        return $this->request('orderbook/{symbol}', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PublicGetKline($params = array()) {
        return $this->request('kline', array('v1', 'public'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateGetClientToken($params = array()) {
        return $this->request('client/token', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateGetOrderOid($params = array()) {
        return $this->request('order/{oid}', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateGetClientOrderClientOrderId($params = array()) {
        return $this->request('client/order/{client_order_id}', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateGetOrders($params = array()) {
        return $this->request('orders', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateGetClientTradeTid($params = array()) {
        return $this->request('client/trade/{tid}', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateGetOrderOidTrades($params = array()) {
        return $this->request('order/{oid}/trades', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateGetClientTrades($params = array()) {
        return $this->request('client/trades', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateGetClientInfo($params = array()) {
        return $this->request('client/info', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1PrivateGetAssetDeposit($params = array()) {
        return $this->request('asset/deposit', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 10));
    }
    public function v1PrivateGetAssetHistory($params = array()) {
        return $this->request('asset/history', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1PrivateGetSubAccountAll($params = array()) {
        return $this->request('sub_account/all', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1PrivateGetSubAccountAssets($params = array()) {
        return $this->request('sub_account/assets', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1PrivateGetTokenInterest($params = array()) {
        return $this->request('token_interest', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1PrivateGetTokenInterestToken($params = array()) {
        return $this->request('token_interest/{token}', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1PrivateGetInterestHistory($params = array()) {
        return $this->request('interest/history', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1PrivateGetInterestRepay($params = array()) {
        return $this->request('interest/repay', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1PrivateGetFundingFeeHistory($params = array()) {
        return $this->request('funding_fee/history', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 30));
    }
    public function v1PrivateGetPositions($params = array()) {
        return $this->request('positions', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 3.33));
    }
    public function v1PrivateGetPositionSymbol($params = array()) {
        return $this->request('position/{symbol}', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 3.33));
    }
    public function v1PrivateGetClientTransactionHistory($params = array()) {
        return $this->request('client/transaction_history', array('v1', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v1PrivatePostOrder($params = array()) {
        return $this->request('order', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 5));
    }
    public function v1PrivatePostAssetMainSubTransfer($params = array()) {
        return $this->request('asset/main_sub_transfer', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 30));
    }
    public function v1PrivatePostAssetWithdraw($params = array()) {
        return $this->request('asset/withdraw', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 30));
    }
    public function v1PrivatePostInterestRepay($params = array()) {
        return $this->request('interest/repay', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 60));
    }
    public function v1PrivatePostClientAccountMode($params = array()) {
        return $this->request('client/account_mode', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 120));
    }
    public function v1PrivatePostClientLeverage($params = array()) {
        return $this->request('client/leverage', array('v1', 'private'), 'POST', $params, null, null, array("cost" => 120));
    }
    public function v1PrivateDeleteOrder($params = array()) {
        return $this->request('order', array('v1', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateDeleteClientOrder($params = array()) {
        return $this->request('client/order', array('v1', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateDeleteOrders($params = array()) {
        return $this->request('orders', array('v1', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v1PrivateDeleteAssetWithdraw($params = array()) {
        return $this->request('asset/withdraw', array('v1', 'private'), 'DELETE', $params, null, null, array("cost" => 120));
    }
    public function v2PrivateGetClientHolding($params = array()) {
        return $this->request('client/holding', array('v2', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v3PrivateGetAlgoOrderOid($params = array()) {
        return $this->request('algo/order/{oid}', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v3PrivateGetAlgoOrders($params = array()) {
        return $this->request('algo/orders', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v3PrivateGetBalances($params = array()) {
        return $this->request('balances', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v3PrivateGetAccountinfo($params = array()) {
        return $this->request('accountinfo', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 60));
    }
    public function v3PrivateGetPositions($params = array()) {
        return $this->request('positions', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 3.33));
    }
    public function v3PrivateGetBuypower($params = array()) {
        return $this->request('buypower', array('v3', 'private'), 'GET', $params, null, null, array("cost" => 1));
    }
    public function v3PrivatePostAlgoOrder($params = array()) {
        return $this->request('algo/order', array('v3', 'private'), 'POST', $params, null, null, array("cost" => 5));
    }
    public function v3PrivatePutOrderOid($params = array()) {
        return $this->request('order/{oid}', array('v3', 'private'), 'PUT', $params, null, null, array("cost" => 2));
    }
    public function v3PrivatePutOrderClientClientOrderId($params = array()) {
        return $this->request('order/client/{client_order_id}', array('v3', 'private'), 'PUT', $params, null, null, array("cost" => 2));
    }
    public function v3PrivatePutAlgoOrderOid($params = array()) {
        return $this->request('algo/order/{oid}', array('v3', 'private'), 'PUT', $params, null, null, array("cost" => 2));
    }
    public function v3PrivatePutAlgoOrderClientClientOrderId($params = array()) {
        return $this->request('algo/order/client/{client_order_id}', array('v3', 'private'), 'PUT', $params, null, null, array("cost" => 2));
    }
    public function v3PrivateDeleteAlgoOrderOrderId($params = array()) {
        return $this->request('algo/order/{order_id}', array('v3', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v3PrivateDeleteAlgoOrdersPending($params = array()) {
        return $this->request('algo/orders/pending', array('v3', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v3PrivateDeleteAlgoOrdersPendingSymbol($params = array()) {
        return $this->request('algo/orders/pending/{symbol}', array('v3', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function v3PrivateDeleteOrdersPending($params = array()) {
        return $this->request('orders/pending', array('v3', 'private'), 'DELETE', $params, null, null, array("cost" => 1));
    }
}
