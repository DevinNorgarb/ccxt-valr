<?php

namespace ccxt\async\abstract;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


abstract class wazirx extends \ccxt\async\Exchange {
    public function public_get_exchangeinfo($params = array()) {
        return $this->request('exchangeInfo', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function public_get_depth($params = array()) {
        return $this->request('depth', 'public', 'GET', $params, null, null, array("cost" => 0.5));
    }
    public function public_get_ping($params = array()) {
        return $this->request('ping', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function public_get_systemstatus($params = array()) {
        return $this->request('systemStatus', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function public_get_tickers_24hr($params = array()) {
        return $this->request('tickers/24hr', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function public_get_ticker_24hr($params = array()) {
        return $this->request('ticker/24hr', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function public_get_time($params = array()) {
        return $this->request('time', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function public_get_trades($params = array()) {
        return $this->request('trades', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function public_get_klines($params = array()) {
        return $this->request('klines', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function private_get_account($params = array()) {
        return $this->request('account', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function private_get_allorders($params = array()) {
        return $this->request('allOrders', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function private_get_funds($params = array()) {
        return $this->request('funds', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function private_get_historicaltrades($params = array()) {
        return $this->request('historicalTrades', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function private_get_openorders($params = array()) {
        return $this->request('openOrders', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function private_get_order($params = array()) {
        return $this->request('order', 'private', 'GET', $params, null, null, array("cost" => 0.5));
    }
    public function private_get_mytrades($params = array()) {
        return $this->request('myTrades', 'private', 'GET', $params, null, null, array("cost" => 0.5));
    }
    public function private_get_coins($params = array()) {
        return $this->request('coins', 'private', 'GET', $params, null, null, array("cost" => 12));
    }
    public function private_get_crypto_withdraws($params = array()) {
        return $this->request('crypto/withdraws', 'private', 'GET', $params, null, null, array("cost" => 12));
    }
    public function private_get_crypto_deposits_address($params = array()) {
        return $this->request('crypto/deposits/address', 'private', 'GET', $params, null, null, array("cost" => 60));
    }
    public function private_get_sub_account_fund_transfer_history($params = array()) {
        return $this->request('sub_account/fund_transfer/history', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function private_get_sub_account_accounts($params = array()) {
        return $this->request('sub_account/accounts', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function private_post_order($params = array()) {
        return $this->request('order', 'private', 'POST', $params, null, null, array("cost" => 0.1));
    }
    public function private_post_order_test($params = array()) {
        return $this->request('order/test', 'private', 'POST', $params, null, null, array("cost" => 0.5));
    }
    public function private_post_create_auth_token($params = array()) {
        return $this->request('create_auth_token', 'private', 'POST', $params, null, null, array("cost" => 1));
    }
    public function private_delete_order($params = array()) {
        return $this->request('order', 'private', 'DELETE', $params, null, null, array("cost" => 0.1));
    }
    public function private_delete_openorders($params = array()) {
        return $this->request('openOrders', 'private', 'DELETE', $params, null, null, array("cost" => 1));
    }
    public function publicGetExchangeInfo($params = array()) {
        return $this->request('exchangeInfo', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function publicGetDepth($params = array()) {
        return $this->request('depth', 'public', 'GET', $params, null, null, array("cost" => 0.5));
    }
    public function publicGetPing($params = array()) {
        return $this->request('ping', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function publicGetSystemStatus($params = array()) {
        return $this->request('systemStatus', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function publicGetTickers24hr($params = array()) {
        return $this->request('tickers/24hr', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function publicGetTicker24hr($params = array()) {
        return $this->request('ticker/24hr', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function publicGetTime($params = array()) {
        return $this->request('time', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function publicGetTrades($params = array()) {
        return $this->request('trades', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function publicGetKlines($params = array()) {
        return $this->request('klines', 'public', 'GET', $params, null, null, array("cost" => 1));
    }
    public function privateGetAccount($params = array()) {
        return $this->request('account', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function privateGetAllOrders($params = array()) {
        return $this->request('allOrders', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function privateGetFunds($params = array()) {
        return $this->request('funds', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function privateGetHistoricalTrades($params = array()) {
        return $this->request('historicalTrades', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function privateGetOpenOrders($params = array()) {
        return $this->request('openOrders', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function privateGetOrder($params = array()) {
        return $this->request('order', 'private', 'GET', $params, null, null, array("cost" => 0.5));
    }
    public function privateGetMyTrades($params = array()) {
        return $this->request('myTrades', 'private', 'GET', $params, null, null, array("cost" => 0.5));
    }
    public function privateGetCoins($params = array()) {
        return $this->request('coins', 'private', 'GET', $params, null, null, array("cost" => 12));
    }
    public function privateGetCryptoWithdraws($params = array()) {
        return $this->request('crypto/withdraws', 'private', 'GET', $params, null, null, array("cost" => 12));
    }
    public function privateGetCryptoDepositsAddress($params = array()) {
        return $this->request('crypto/deposits/address', 'private', 'GET', $params, null, null, array("cost" => 60));
    }
    public function privateGetSubAccountFundTransferHistory($params = array()) {
        return $this->request('sub_account/fund_transfer/history', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function privateGetSubAccountAccounts($params = array()) {
        return $this->request('sub_account/accounts', 'private', 'GET', $params, null, null, array("cost" => 1));
    }
    public function privatePostOrder($params = array()) {
        return $this->request('order', 'private', 'POST', $params, null, null, array("cost" => 0.1));
    }
    public function privatePostOrderTest($params = array()) {
        return $this->request('order/test', 'private', 'POST', $params, null, null, array("cost" => 0.5));
    }
    public function privatePostCreateAuthToken($params = array()) {
        return $this->request('create_auth_token', 'private', 'POST', $params, null, null, array("cost" => 1));
    }
    public function privateDeleteOrder($params = array()) {
        return $this->request('order', 'private', 'DELETE', $params, null, null, array("cost" => 0.1));
    }
    public function privateDeleteOpenOrders($params = array()) {
        return $this->request('openOrders', 'private', 'DELETE', $params, null, null, array("cost" => 1));
    }
}
