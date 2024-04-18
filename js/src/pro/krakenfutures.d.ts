import krakenfuturesRest from '../krakenfutures.js';
import type { Int, Str, Strings, OrderBook, Order, Trade, Ticker, Tickers, Position, Balances } from '../base/types.js';
import Client from '../base/ws/Client.js';
export default class krakenfutures extends krakenfuturesRest {
    describe(): any;
    authenticate(params?: {}): Promise<any>;
    watchOrderBookForSymbols(symbols: string[], limit?: Int, params?: {}): Promise<OrderBook>;
    subscribePublic(name: string, symbols: string[], params?: {}): Promise<any>;
    subscribePrivate(name: string, messageHash: string, params?: {}): Promise<any>;
    watchTicker(symbol: string, params?: {}): Promise<Ticker>;
    watchTickers(symbols?: Strings, params?: {}): Promise<Tickers>;
    watchBidsAsks(symbols?: Strings, params?: {}): Promise<Tickers>;
    watchTrades(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    watchTradesForSymbols(symbols: string[], since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    watchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<OrderBook>;
    watchPositions(symbols?: Strings, since?: Int, limit?: Int, params?: {}): Promise<Position[]>;
    handlePositions(client: any, message: any): void;
    parseWsPosition(position: any, market?: any): Position;
    watchOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    watchMyTrades(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    watchBalance(params?: {}): Promise<Balances>;
    handleTrade(client: Client, message: any): void;
    parseWsTrade(trade: any, market?: any): Trade;
    parseWsOrderTrade(trade: any, market?: any): Trade;
    handleOrder(client: Client, message: any): any;
    handleOrderSnapshot(client: Client, message: any): void;
    parseWsOrder(order: any, market?: any): Order;
    handleTicker(client: Client, message: any): void;
    handleBidAsk(client: Client, message: any): void;
    parseWsTicker(ticker: any, market?: any): Ticker;
    handleOrderBookSnapshot(client: Client, message: any): void;
    handleOrderBook(client: Client, message: any): void;
    handleBalance(client: Client, message: any): void;
    handleMyTrades(client: Client, message: any): void;
    parseWsMyTrade(trade: any, market?: any): Trade;
    watchMultiHelper(unifiedName: string, channelName: string, symbols?: Strings, subscriptionArgs?: any, params?: {}): Promise<any>;
    getMessageHash(unifiedElementName: string, subChannelName?: Str, symbol?: Str): string;
    handleErrorMessage(client: Client, message: any): void;
    handleMessage(client: any, message: any): void;
    handleAuthenticate(client: Client, message: any): any;
}
