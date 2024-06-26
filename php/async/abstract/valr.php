<?php

namespace ccxt\async\abstract;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


abstract class valr extends \ccxt\async\Exchange {
    public function public_get_pair_orderbook($params = array()) {
        return $this->request('{pair}/orderbook', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_pair_orderbook_full($params = array()) {
        return $this->request('{pair}/orderbook/full', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_currencies($params = array()) {
        return $this->request('currencies', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_pairs($params = array()) {
        return $this->request('pairs', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_ordertypes($params = array()) {
        return $this->request('ordertypes', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_pair_ordertypes($params = array()) {
        return $this->request('{pair}/ordertypes', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_marketsummary($params = array()) {
        return $this->request('marketsummary', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_pair_marketsummary($params = array()) {
        return $this->request('{pair}/marketsummary', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_pair_markprice_buckets($params = array()) {
        return $this->request('{pair}/markprice/buckets', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_pair_trades($params = array()) {
        return $this->request('{pair}/trades', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_pair_futures_funding_history($params = array()) {
        return $this->request('{pair}/futures/funding/history', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_time($params = array()) {
        return $this->request('time', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_status($params = array()) {
        return $this->request('status', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_futures_info($params = array()) {
        return $this->request('futures/info', 'public', 'GET', $params, null, null, array());
    }
    public function private_get_account_api_keys_current($params = array()) {
        return $this->request('account/api-keys/current', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_subaccounts($params = array()) {
        return $this->request('account/subaccounts', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_balances($params = array()) {
        return $this->request('account/balances', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_balances_all($params = array()) {
        return $this->request('account/balances/all', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_transactionhistory($params = array()) {
        return $this->request('account/transactionhistory', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_pair_tradehistory($params = array()) {
        return $this->request('account/{pair}/tradehistory', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_fees_trade($params = array()) {
        return $this->request('account/fees/trade', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_marketdata_pair_orderbook($params = array()) {
        return $this->request('marketdata/{pair}/orderbook', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_marketdata_pair_orderbook_full($params = array()) {
        return $this->request('marketdata/{pair}/orderbook/full', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_marketdata_pair_tradehistory($params = array()) {
        return $this->request('marketdata/{pair}/tradehistory', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_crypto_currency_deposit_address($params = array()) {
        return $this->request('wallet/crypto/{currency}/deposit/address', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_crypto_currency_deposit_history($params = array()) {
        return $this->request('wallet/crypto/{currency}/deposit/history', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_crypto_address_book($params = array()) {
        return $this->request('wallet/crypto/address-book', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_crypto_address_book_currency($params = array()) {
        return $this->request('wallet/crypto/address-book/{currency}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_crypto_currency_withdraw($params = array()) {
        return $this->request('wallet/crypto/{currency}/withdraw', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_crypto_currency_withdraw_id($params = array()) {
        return $this->request('wallet/crypto/{currency}/withdraw/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_crypto_currency_withdraw_history($params = array()) {
        return $this->request('wallet/crypto/{currency}/withdraw/history', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_fiat_currency_accounts_id($params = array()) {
        return $this->request('wallet/fiat/{currency}/accounts/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_fiat_currency_accounts($params = array()) {
        return $this->request('wallet/fiat/{currency}/accounts', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_fiat_currency_banks($params = array()) {
        return $this->request('wallet/fiat/{currency}/banks', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_fiat_currency_deposit_reference($params = array()) {
        return $this->request('wallet/fiat/{currency}/deposit/reference', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_fiat_currency_deposit_reference_currency($params = array()) {
        return $this->request('wallet/fiat/{currency}/deposit/reference/{currency}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wallet_fiat_currency_auto_buy($params = array()) {
        return $this->request('wallet/fiat/{currency}/auto-buy', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_wire_accounts($params = array()) {
        return $this->request('wire/accounts', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_simple_pair_order_id($params = array()) {
        return $this->request('simple/{pair}/order/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_pay_limits($params = array()) {
        return $this->request('pay/limits', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_pay_payid($params = array()) {
        return $this->request('pay/payid', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_pay_history($params = array()) {
        return $this->request('pay/history', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_pay_identifier_identifier($params = array()) {
        return $this->request('pay/identifier/{identifier}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_pay_transactionid_id($params = array()) {
        return $this->request('pay/transactionid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_orders_pair_orderid_id($params = array()) {
        return $this->request('orders/{pair}/orderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_orders_pair_customerorderid_id($params = array()) {
        return $this->request('orders/{pair}/customerorderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_orders_open($params = array()) {
        return $this->request('orders/open', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_orders_history($params = array()) {
        return $this->request('orders/history', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_orders_history_summary_orderid_id($params = array()) {
        return $this->request('orders/history/summary/orderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_orders_history_summary_customerorderid_id($params = array()) {
        return $this->request('orders/history/summary/customerorderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_orders_history_detail_orderid_id($params = array()) {
        return $this->request('orders/history/detail/orderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_orders_history_detail_customerorderid_id($params = array()) {
        return $this->request('orders/history/detail/customerorderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_staking_balances_currency($params = array()) {
        return $this->request('staking/balances/{currency}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_staking_rates($params = array()) {
        return $this->request('staking/rates', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_staking_rates_currency($params = array()) {
        return $this->request('staking/rates/{currency}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_staking_rewards($params = array()) {
        return $this->request('staking/rewards', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_staking_history($params = array()) {
        return $this->request('staking/history', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_margin_status($params = array()) {
        return $this->request('margin/status', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_margin_account_status($params = array()) {
        return $this->request('margin/account/status', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_positions_open($params = array()) {
        return $this->request('positions/open', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_positions_closed_summary($params = array()) {
        return $this->request('positions/closed/summary', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_positions_closed($params = array()) {
        return $this->request('positions/closed', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_positions_history($params = array()) {
        return $this->request('positions/history', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_positions_funding_history($params = array()) {
        return $this->request('positions/funding/history', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_borrows_currency_history($params = array()) {
        return $this->request('borrows/{currency}/history', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_loans_rates($params = array()) {
        return $this->request('loans/rates', 'private', 'GET', $params, null, null, array());
    }
    public function private_post_account_subaccount($params = array()) {
        return $this->request('account/subaccount', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_account_subaccounts_transfer($params = array()) {
        return $this->request('account/subaccounts/transfer', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_wallet_crypto_currency_withdraw($params = array()) {
        return $this->request('wallet/crypto/{currency}/withdraw', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_wallet_fiat_currency_accounts($params = array()) {
        return $this->request('wallet/fiat/{currency}/accounts', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_wallet_fiat_currency_withdraw($params = array()) {
        return $this->request('wallet/fiat/{currency}/withdraw', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_wire_withdrawals($params = array()) {
        return $this->request('wire/withdrawals', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_simple_pair_quote($params = array()) {
        return $this->request('simple/{pair}/quote', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_simple_pair_order($params = array()) {
        return $this->request('simple/{pair}/order', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_pay($params = array()) {
        return $this->request('pay', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_orders_limit($params = array()) {
        return $this->request('orders/limit', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_orders_market($params = array()) {
        return $this->request('orders/market', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_orders_stop_limit($params = array()) {
        return $this->request('orders/stop/limit', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_batch_orders($params = array()) {
        return $this->request('batch/orders', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_staking_stake($params = array()) {
        return $this->request('staking/stake', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_staking_un_stake($params = array()) {
        return $this->request('staking/un-stake', 'private', 'POST', $params, null, null, array());
    }
    public function private_put_pay_transactionid_id_reverse($params = array()) {
        return $this->request('pay/transactionid/{id}/reverse', 'private', 'PUT', $params, null, null, array());
    }
    public function private_put_orders_modify($params = array()) {
        return $this->request('orders/modify', 'private', 'PUT', $params, null, null, array());
    }
    public function private_put_margin_account_status($params = array()) {
        return $this->request('margin/account/status', 'private', 'PUT', $params, null, null, array());
    }
    public function private_delete_wallet_fiat_currency_accounts_id($params = array()) {
        return $this->request('wallet/fiat/{currency}/accounts/{id}', 'private', 'DELETE', $params, null, null, array());
    }
    public function private_delete_orders_order($params = array()) {
        return $this->request('orders/order', 'private', 'DELETE', $params, null, null, array());
    }
    public function private_delete_orders($params = array()) {
        return $this->request('orders', 'private', 'DELETE', $params, null, null, array());
    }
    public function private_delete_orders_pair($params = array()) {
        return $this->request('orders/{pair}', 'private', 'DELETE', $params, null, null, array());
    }
    public function privatev2_get_margin_status($params = array()) {
        return $this->request('margin/status', 'privateV2', 'GET', $params, null, null, array());
    }
    public function privatev2_get_healthz($params = array()) {
        return $this->request('healthz', 'privateV2', 'GET', $params, null, null, array());
    }
    public function privatev2_post_orders_market($params = array()) {
        return $this->request('orders/market', 'privateV2', 'POST', $params, null, null, array());
    }
    public function privatev2_post_orders_limit($params = array()) {
        return $this->request('orders/limit', 'privateV2', 'POST', $params, null, null, array());
    }
    public function privatev2_post_orders_stop_limit($params = array()) {
        return $this->request('orders/stop/limit', 'privateV2', 'POST', $params, null, null, array());
    }
    public function privatev2_put_orders_modify($params = array()) {
        return $this->request('orders/modify', 'privateV2', 'PUT', $params, null, null, array());
    }
    public function privatev2_delete_orders_order($params = array()) {
        return $this->request('orders/order', 'privateV2', 'DELETE', $params, null, null, array());
    }
    public function publicGetPairOrderbook($params = array()) {
        return $this->request('{pair}/orderbook', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetPairOrderbookFull($params = array()) {
        return $this->request('{pair}/orderbook/full', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetCurrencies($params = array()) {
        return $this->request('currencies', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetPairs($params = array()) {
        return $this->request('pairs', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetOrdertypes($params = array()) {
        return $this->request('ordertypes', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetPairOrdertypes($params = array()) {
        return $this->request('{pair}/ordertypes', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetMarketsummary($params = array()) {
        return $this->request('marketsummary', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetPairMarketsummary($params = array()) {
        return $this->request('{pair}/marketsummary', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetPairMarkpriceBuckets($params = array()) {
        return $this->request('{pair}/markprice/buckets', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetPairTrades($params = array()) {
        return $this->request('{pair}/trades', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetPairFuturesFundingHistory($params = array()) {
        return $this->request('{pair}/futures/funding/history', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetTime($params = array()) {
        return $this->request('time', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetStatus($params = array()) {
        return $this->request('status', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetFuturesInfo($params = array()) {
        return $this->request('futures/info', 'public', 'GET', $params, null, null, array());
    }
    public function privateGetAccountApiKeysCurrent($params = array()) {
        return $this->request('account/api-keys/current', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountSubaccounts($params = array()) {
        return $this->request('account/subaccounts', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountBalances($params = array()) {
        return $this->request('account/balances', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountBalancesAll($params = array()) {
        return $this->request('account/balances/all', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountTransactionhistory($params = array()) {
        return $this->request('account/transactionhistory', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountPairTradehistory($params = array()) {
        return $this->request('account/{pair}/tradehistory', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountFeesTrade($params = array()) {
        return $this->request('account/fees/trade', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetMarketdataPairOrderbook($params = array()) {
        return $this->request('marketdata/{pair}/orderbook', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetMarketdataPairOrderbookFull($params = array()) {
        return $this->request('marketdata/{pair}/orderbook/full', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetMarketdataPairTradehistory($params = array()) {
        return $this->request('marketdata/{pair}/tradehistory', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletCryptoCurrencyDepositAddress($params = array()) {
        return $this->request('wallet/crypto/{currency}/deposit/address', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletCryptoCurrencyDepositHistory($params = array()) {
        return $this->request('wallet/crypto/{currency}/deposit/history', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletCryptoAddressBook($params = array()) {
        return $this->request('wallet/crypto/address-book', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletCryptoAddressBookCurrency($params = array()) {
        return $this->request('wallet/crypto/address-book/{currency}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletCryptoCurrencyWithdraw($params = array()) {
        return $this->request('wallet/crypto/{currency}/withdraw', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletCryptoCurrencyWithdrawId($params = array()) {
        return $this->request('wallet/crypto/{currency}/withdraw/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletCryptoCurrencyWithdrawHistory($params = array()) {
        return $this->request('wallet/crypto/{currency}/withdraw/history', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletFiatCurrencyAccountsId($params = array()) {
        return $this->request('wallet/fiat/{currency}/accounts/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletFiatCurrencyAccounts($params = array()) {
        return $this->request('wallet/fiat/{currency}/accounts', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletFiatCurrencyBanks($params = array()) {
        return $this->request('wallet/fiat/{currency}/banks', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletFiatCurrencyDepositReference($params = array()) {
        return $this->request('wallet/fiat/{currency}/deposit/reference', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletFiatCurrencyDepositReferenceCurrency($params = array()) {
        return $this->request('wallet/fiat/{currency}/deposit/reference/{currency}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWalletFiatCurrencyAutoBuy($params = array()) {
        return $this->request('wallet/fiat/{currency}/auto-buy', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetWireAccounts($params = array()) {
        return $this->request('wire/accounts', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetSimplePairOrderId($params = array()) {
        return $this->request('simple/{pair}/order/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetPayLimits($params = array()) {
        return $this->request('pay/limits', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetPayPayid($params = array()) {
        return $this->request('pay/payid', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetPayHistory($params = array()) {
        return $this->request('pay/history', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetPayIdentifierIdentifier($params = array()) {
        return $this->request('pay/identifier/{identifier}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetPayTransactionidId($params = array()) {
        return $this->request('pay/transactionid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetOrdersPairOrderidId($params = array()) {
        return $this->request('orders/{pair}/orderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetOrdersPairCustomerorderidId($params = array()) {
        return $this->request('orders/{pair}/customerorderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetOrdersOpen($params = array()) {
        return $this->request('orders/open', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetOrdersHistory($params = array()) {
        return $this->request('orders/history', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetOrdersHistorySummaryOrderidId($params = array()) {
        return $this->request('orders/history/summary/orderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetOrdersHistorySummaryCustomerorderidId($params = array()) {
        return $this->request('orders/history/summary/customerorderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetOrdersHistoryDetailOrderidId($params = array()) {
        return $this->request('orders/history/detail/orderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetOrdersHistoryDetailCustomerorderidId($params = array()) {
        return $this->request('orders/history/detail/customerorderid/{id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetStakingBalancesCurrency($params = array()) {
        return $this->request('staking/balances/{currency}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetStakingRates($params = array()) {
        return $this->request('staking/rates', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetStakingRatesCurrency($params = array()) {
        return $this->request('staking/rates/{currency}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetStakingRewards($params = array()) {
        return $this->request('staking/rewards', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetStakingHistory($params = array()) {
        return $this->request('staking/history', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetMarginStatus($params = array()) {
        return $this->request('margin/status', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetMarginAccountStatus($params = array()) {
        return $this->request('margin/account/status', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetPositionsOpen($params = array()) {
        return $this->request('positions/open', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetPositionsClosedSummary($params = array()) {
        return $this->request('positions/closed/summary', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetPositionsClosed($params = array()) {
        return $this->request('positions/closed', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetPositionsHistory($params = array()) {
        return $this->request('positions/history', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetPositionsFundingHistory($params = array()) {
        return $this->request('positions/funding/history', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetBorrowsCurrencyHistory($params = array()) {
        return $this->request('borrows/{currency}/history', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetLoansRates($params = array()) {
        return $this->request('loans/rates', 'private', 'GET', $params, null, null, array());
    }
    public function privatePostAccountSubaccount($params = array()) {
        return $this->request('account/subaccount', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostAccountSubaccountsTransfer($params = array()) {
        return $this->request('account/subaccounts/transfer', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostWalletCryptoCurrencyWithdraw($params = array()) {
        return $this->request('wallet/crypto/{currency}/withdraw', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostWalletFiatCurrencyAccounts($params = array()) {
        return $this->request('wallet/fiat/{currency}/accounts', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostWalletFiatCurrencyWithdraw($params = array()) {
        return $this->request('wallet/fiat/{currency}/withdraw', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostWireWithdrawals($params = array()) {
        return $this->request('wire/withdrawals', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostSimplePairQuote($params = array()) {
        return $this->request('simple/{pair}/quote', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostSimplePairOrder($params = array()) {
        return $this->request('simple/{pair}/order', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostPay($params = array()) {
        return $this->request('pay', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostOrdersLimit($params = array()) {
        return $this->request('orders/limit', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostOrdersMarket($params = array()) {
        return $this->request('orders/market', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostOrdersStopLimit($params = array()) {
        return $this->request('orders/stop/limit', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostBatchOrders($params = array()) {
        return $this->request('batch/orders', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostStakingStake($params = array()) {
        return $this->request('staking/stake', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostStakingUnStake($params = array()) {
        return $this->request('staking/un-stake', 'private', 'POST', $params, null, null, array());
    }
    public function privatePutPayTransactionidIdReverse($params = array()) {
        return $this->request('pay/transactionid/{id}/reverse', 'private', 'PUT', $params, null, null, array());
    }
    public function privatePutOrdersModify($params = array()) {
        return $this->request('orders/modify', 'private', 'PUT', $params, null, null, array());
    }
    public function privatePutMarginAccountStatus($params = array()) {
        return $this->request('margin/account/status', 'private', 'PUT', $params, null, null, array());
    }
    public function privateDeleteWalletFiatCurrencyAccountsId($params = array()) {
        return $this->request('wallet/fiat/{currency}/accounts/{id}', 'private', 'DELETE', $params, null, null, array());
    }
    public function privateDeleteOrdersOrder($params = array()) {
        return $this->request('orders/order', 'private', 'DELETE', $params, null, null, array());
    }
    public function privateDeleteOrders($params = array()) {
        return $this->request('orders', 'private', 'DELETE', $params, null, null, array());
    }
    public function privateDeleteOrdersPair($params = array()) {
        return $this->request('orders/{pair}', 'private', 'DELETE', $params, null, null, array());
    }
    public function privateV2GetMarginStatus($params = array()) {
        return $this->request('margin/status', 'privateV2', 'GET', $params, null, null, array());
    }
    public function privateV2GetHealthz($params = array()) {
        return $this->request('healthz', 'privateV2', 'GET', $params, null, null, array());
    }
    public function privateV2PostOrdersMarket($params = array()) {
        return $this->request('orders/market', 'privateV2', 'POST', $params, null, null, array());
    }
    public function privateV2PostOrdersLimit($params = array()) {
        return $this->request('orders/limit', 'privateV2', 'POST', $params, null, null, array());
    }
    public function privateV2PostOrdersStopLimit($params = array()) {
        return $this->request('orders/stop/limit', 'privateV2', 'POST', $params, null, null, array());
    }
    public function privateV2PutOrdersModify($params = array()) {
        return $this->request('orders/modify', 'privateV2', 'PUT', $params, null, null, array());
    }
    public function privateV2DeleteOrdersOrder($params = array()) {
        return $this->request('orders/order', 'privateV2', 'DELETE', $params, null, null, array());
    }
}
