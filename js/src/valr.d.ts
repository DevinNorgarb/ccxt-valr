import Exchange from './abstract/valr.js';
import type { Market, Balances, Tickers, Ticker, Order, OrderType, OrderSide, OrderRequest, Int, OrderBook, Trade, Currency, Transaction, Account, Currencies, TradingFees } from './base/types.js';
/**
 * @class valr
 * @augments Exchange
 */
export default class valr extends Exchange {
    describe(): any;
    checkRequiredSymbolArgument(methodName: string, symbol: string): void;
    checkRequiredCurrencyCodeArgument(methodName: string, code: string): void;
    isFiat(code: any): boolean;
    fetchTime(params?: {}): Promise<number>;
    fetchStatus(params?: {}): Promise<any>;
    fetchCurrencies(params?: {}): Promise<Currencies>;
    fetchMarkets(params?: {}): Promise<import("./base/types.js").MarketInterface[]>;
    parseMarket(market: any): Market;
    fetchTickers(symbols?: string[], params?: {}): Promise<Tickers>;
    fetchTicker(symbol: string, params?: {}): Promise<Ticker>;
    parseTicker(ticker: object, market?: Market): Ticker;
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<OrderBook>;
    fetchL3OrderBook(symbol: string, limit?: Int, params?: {}): Promise<OrderBook>;
    fetchPermissions(params?: {}): Promise<{
        info: Promise<any>;
        created: number;
        viewaccess: any;
        trade: any;
        cryptwithdraws: any;
        fiatwithdraws: any;
        transfers: any;
    }>;
    fetchBalance(params?: {}): Promise<Balances>;
    parseBalance(balances: any): Balances;
    fetchAccounts(params?: {}): Promise<Account[]>;
    parseAccount(account: any): Account;
    fetchOrder(id: string, symbol?: string, params?: {}): Promise<Order>;
    fetchOpenOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchClosedOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    parseOrder(order: any, market?: Market): Order;
    createOrder(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: number, params?: {}): Promise<Order>;
    createOrders(orders: OrderRequest[], params?: {}): Promise<Order[]>;
    editOrder(id: string, symbol: string, type: OrderType, side: OrderSide, amount?: number, price?: number, params?: {}): Promise<Order>;
    cancelOrder(id: string, symbol?: string, params?: {}): Promise<Order>;
    cancelAllOrders(symbol?: string, params?: {}): Promise<Order[]>;
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchMyTrades(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    parseTrade(trade: object, market?: Market): Trade;
    fetchTradingFees(params?: {}): Promise<TradingFees>;
    loadTradingFees(params?: {}): Promise<void>;
    fetchDepositAddress(code: string, params?: {}): Promise<{
        currency: string;
        network: string;
        address: string;
        tag: string;
        info: any;
    }>;
    parseDepositAddress(depositAddress: any, currency?: Currency): {
        currency: string;
        network: string;
        address: string;
        tag: string;
        info: any;
    };
    fetchDeposits(code?: string, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    fetchWithdrawals(code?: string, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    withdraw(code: string, amount: number, address: string, tag?: any, params?: {}): Promise<Transaction>;
    parseTransaction(transaction: any, currency?: Currency): Transaction;
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: string;
        method: string;
        body: any;
        headers: any;
    };
}
