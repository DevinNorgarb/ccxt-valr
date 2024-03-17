import Exchange from './abstract/binance.js';
import type { TransferEntry, Int, OrderSide, Balances, OrderType, Trade, OHLCV, Order, FundingRateHistory, OpenInterest, Liquidation, OrderRequest, Str, Transaction, Ticker, OrderBook, Tickers, Market, Greeks, Strings, Currency, MarketInterface, MarginMode, MarginModes, Leverage, Leverages, Num } from './base/types.js';
/**
 * @class binance
 * @augments Exchange
 */
export default class binance extends Exchange {
    describe(): any;
    isInverse(type: any, subType?: any): boolean;
    isLinear(type: any, subType?: any): boolean;
    setSandboxMode(enable: boolean): void;
    convertExpireDate(date: any): string;
    createExpiredOptionMarket(symbol: string): MarketInterface;
    market(symbol: any): any;
    safeMarket(marketId?: any, market?: any, delimiter?: any, marketType?: any): MarketInterface;
    costToPrecision(symbol: any, cost: any): any;
    currencyToPrecision(code: any, fee: any, networkCode?: any): any;
    nonce(): number;
    fetchTime(params?: {}): Promise<number>;
    fetchCurrencies(params?: {}): Promise<{}>;
    fetchMarkets(params?: {}): Promise<any[]>;
    parseMarket(market: any): Market;
    parseBalanceHelper(entry: any): import("./base/types.js").BalanceAccount;
    parseBalanceCustom(response: any, type?: any, marginMode?: any, isPortfolioMargin?: boolean): Balances;
    fetchBalance(params?: {}): Promise<Balances>;
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<OrderBook>;
    parseTicker(ticker: any, market?: Market): Ticker;
    fetchStatus(params?: {}): Promise<{
        status: string;
        updated: any;
        eta: any;
        url: any;
        info: any;
    }>;
    fetchTicker(symbol: string, params?: {}): Promise<Ticker>;
    fetchBidsAsks(symbols?: Strings, params?: {}): Promise<import("./base/types.js").Dictionary<Ticker>>;
    fetchLastPrices(symbols?: Strings, params?: {}): Promise<import("./base/types.js").LastPrices>;
    parseLastPrice(entry: any, market?: Market): {
        symbol: string;
        timestamp: number;
        datetime: string;
        price: number;
        side: any;
        info: any;
    };
    fetchTickers(symbols?: Strings, params?: {}): Promise<Tickers>;
    parseOHLCV(ohlcv: any, market?: Market): OHLCV;
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OHLCV[]>;
    parseTrade(trade: any, market?: Market): Trade;
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    editSpotOrder(id: string, symbol: string, type: OrderType, side: OrderSide, amount: number, price?: Num, params?: {}): Promise<Order>;
    editSpotOrderRequest(id: string, symbol: string, type: OrderType, side: OrderSide, amount: number, price?: Num, params?: {}): any;
    editContractOrder(id: string, symbol: string, type: OrderType, side: OrderSide, amount: number, price?: Num, params?: {}): Promise<Order>;
    editOrder(id: string, symbol: string, type: OrderType, side: OrderSide, amount?: Num, price?: Num, params?: {}): Promise<Order>;
    parseOrderStatus(status: any): string;
    parseOrder(order: any, market?: Market): Order;
    createOrders(orders: OrderRequest[], params?: {}): Promise<Order[]>;
    createOrder(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: Num, params?: {}): Promise<Order>;
    createOrderRequest(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: Num, params?: {}): any;
    createMarketOrderWithCost(symbol: string, side: OrderSide, cost: number, params?: {}): Promise<Order>;
    createMarketBuyOrderWithCost(symbol: string, cost: number, params?: {}): Promise<Order>;
    createMarketSellOrderWithCost(symbol: string, cost: number, params?: {}): Promise<Order>;
    fetchOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    fetchOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchOpenOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchOpenOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    fetchClosedOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchCanceledOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    fetchCanceledAndClosedOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    cancelOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    cancelAllOrders(symbol?: Str, params?: {}): Promise<any>;
    cancelOrders(ids: string[], symbol?: Str, params?: {}): Promise<Order[]>;
    fetchOrderTrades(id: string, symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchMyTrades(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchMyDustTrades(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseDustTrade(trade: any, market?: Market): {
        id: any;
        timestamp: number;
        datetime: string;
        symbol: any;
        order: string;
        type: any;
        takerOrMaker: any;
        side: any;
        amount: number;
        price: number;
        cost: number;
        fee: {
            currency: any;
            cost: number;
        };
        info: any;
    };
    fetchDeposits(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    fetchWithdrawals(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    parseTransactionStatusByType(status: any, type?: any): string;
    parseTransaction(transaction: any, currency?: Currency): Transaction;
    parseTransferStatus(status: any): string;
    parseTransfer(transfer: any, currency?: Currency): {
        info: any;
        id: string;
        timestamp: number;
        datetime: string;
        currency: string;
        amount: number;
        fromAccount: any;
        toAccount: any;
        status: string;
    };
    parseIncome(income: any, market?: Market): {
        info: any;
        symbol: string;
        code: string;
        timestamp: number;
        datetime: string;
        id: string;
        amount: number;
    };
    transfer(code: string, amount: number, fromAccount: string, toAccount: string, params?: {}): Promise<TransferEntry>;
    fetchTransfers(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    fetchDepositAddress(code: string, params?: {}): Promise<{
        currency: string;
        address: string;
        tag: string;
        network: any;
        info: any;
    }>;
    fetchTransactionFees(codes?: string[], params?: {}): Promise<{
        withdraw: {};
        deposit: {};
        info: any;
    }>;
    fetchDepositWithdrawFees(codes?: Strings, params?: {}): Promise<any>;
    parseDepositWithdrawFee(fee: any, currency?: Currency): any;
    withdraw(code: string, amount: number, address: any, tag?: any, params?: {}): Promise<Transaction>;
    parseTradingFee(fee: any, market?: Market): {
        info: any;
        symbol: string;
        maker: number;
        taker: number;
    };
    fetchTradingFee(symbol: string, params?: {}): Promise<{
        info: any;
        symbol: string;
        maker: number;
        taker: number;
    }>;
    fetchTradingFees(params?: {}): Promise<{}>;
    futuresTransfer(code: string, amount: any, type: any, params?: {}): Promise<{
        info: any;
        id: string;
        timestamp: number;
        datetime: string;
        currency: string;
        amount: number;
        fromAccount: any;
        toAccount: any;
        status: string;
    }>;
    fetchFundingRate(symbol: string, params?: {}): Promise<{
        info: any;
        symbol: string;
        markPrice: number;
        indexPrice: number;
        interestRate: number;
        estimatedSettlePrice: number;
        timestamp: number;
        datetime: string;
        fundingRate: number;
        fundingTimestamp: number;
        fundingDatetime: string;
        nextFundingRate: any;
        nextFundingTimestamp: any;
        nextFundingDatetime: any;
        previousFundingRate: any;
        previousFundingTimestamp: any;
        previousFundingDatetime: any;
    }>;
    fetchFundingRateHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<FundingRateHistory[]>;
    fetchFundingRates(symbols?: Strings, params?: {}): Promise<any>;
    parseFundingRate(contract: any, market?: Market): {
        info: any;
        symbol: string;
        markPrice: number;
        indexPrice: number;
        interestRate: number;
        estimatedSettlePrice: number;
        timestamp: number;
        datetime: string;
        fundingRate: number;
        fundingTimestamp: number;
        fundingDatetime: string;
        nextFundingRate: any;
        nextFundingTimestamp: any;
        nextFundingDatetime: any;
        previousFundingRate: any;
        previousFundingTimestamp: any;
        previousFundingDatetime: any;
    };
    parseAccountPositions(account: any): any[];
    parseAccountPosition(position: any, market?: Market): {
        info: any;
        id: any;
        symbol: string;
        timestamp: number;
        datetime: string;
        initialMargin: number;
        initialMarginPercentage: number;
        maintenanceMargin: number;
        maintenanceMarginPercentage: number;
        entryPrice: number;
        notional: number;
        leverage: number;
        unrealizedPnl: number;
        contracts: number;
        contractSize: any;
        marginRatio: any;
        liquidationPrice: any;
        markPrice: any;
        collateral: number;
        marginMode: any;
        side: any;
        hedged: boolean;
        percentage: any;
    };
    parsePositionRisk(position: any, market?: Market): {
        info: any;
        id: any;
        symbol: string;
        contracts: number;
        contractSize: any;
        unrealizedPnl: number;
        leverage: number;
        liquidationPrice: number;
        collateral: number;
        notional: number;
        markPrice: number;
        entryPrice: number;
        timestamp: number;
        initialMargin: number;
        initialMarginPercentage: number;
        maintenanceMargin: number;
        maintenanceMarginPercentage: number;
        marginRatio: any;
        datetime: string;
        marginMode: string;
        marginType: string;
        side: any;
        hedged: boolean;
        percentage: any;
        stopLossPrice: any;
        takeProfitPrice: any;
    };
    loadLeverageBrackets(reload?: boolean, params?: {}): Promise<any>;
    fetchLeverageTiers(symbols?: Strings, params?: {}): Promise<{}>;
    parseMarketLeverageTiers(info: any, market?: Market): any[];
    fetchPosition(symbol: string, params?: {}): Promise<import("./base/types.js").Position>;
    fetchOptionPositions(symbols?: Strings, params?: {}): Promise<import("./base/types.js").Position[]>;
    parsePosition(position: any, market?: Market): import("./base/types.js").Position;
    fetchPositions(symbols?: Strings, params?: {}): Promise<import("./base/types.js").Position[]>;
    fetchAccountPositions(symbols?: Strings, params?: {}): Promise<import("./base/types.js").Position[]>;
    fetchPositionsRisk(symbols?: Strings, params?: {}): Promise<import("./base/types.js").Position[]>;
    fetchFundingHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").FundingHistory[]>;
    setLeverage(leverage: Int, symbol?: Str, params?: {}): Promise<any>;
    setMarginMode(marginMode: string, symbol?: Str, params?: {}): Promise<any>;
    setPositionMode(hedged: boolean, symbol?: Str, params?: {}): Promise<any>;
    fetchLeverages(symbols?: string[], params?: {}): Promise<Leverages>;
    parseLeverage(leverage: any, market?: any): Leverage;
    fetchSettlementHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    fetchMySettlementHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseSettlement(settlement: any, market: any): {
        info: any;
        symbol: string;
        price: number;
        timestamp: number;
        datetime: string;
    };
    parseSettlements(settlements: any, market: any): any[];
    fetchLedgerEntry(id: string, code?: Str, params?: {}): Promise<any>;
    fetchLedger(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseLedgerEntry(item: any, currency?: Currency): {
        id: string;
        direction: any;
        account: any;
        referenceAccount: any;
        referenceId: string;
        type: string;
        currency: string;
        amount: number;
        timestamp: number;
        datetime: string;
        before: any;
        after: any;
        status: any;
        fee: any;
        info: any;
    };
    parseLedgerEntryType(type: any): string;
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: any;
        method: string;
        body: any;
        headers: any;
    };
    getExceptionsByUrl(url: any, exactOrBroad: any): import("./base/types.js").Dictionary<any>;
    handleErrors(code: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): any;
    calculateRateLimiterCost(api: any, method: any, path: any, params: any, config?: {}): any;
    request(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any, config?: {}): Promise<any>;
    modifyMarginHelper(symbol: string, amount: any, addOrReduce: any, params?: {}): Promise<any>;
    parseMarginModification(data: any, market?: Market): {
        info: any;
        type: string;
        amount: number;
        code: any;
        symbol: string;
        status: string;
    };
    reduceMargin(symbol: string, amount: any, params?: {}): Promise<any>;
    addMargin(symbol: string, amount: any, params?: {}): Promise<any>;
    fetchCrossBorrowRate(code: string, params?: {}): Promise<{
        currency: string;
        rate: number;
        period: number;
        timestamp: number;
        datetime: string;
        info: any;
    }>;
    fetchBorrowRateHistory(code: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseBorrowRateHistory(response: any, code: any, since: any, limit: any): any;
    parseBorrowRate(info: any, currency?: Currency): {
        currency: string;
        rate: number;
        period: number;
        timestamp: number;
        datetime: string;
        info: any;
    };
    createGiftCode(code: string, amount: any, params?: {}): Promise<{
        info: any;
        id: string;
        code: string;
        currency: string;
        amount: any;
    }>;
    redeemGiftCode(giftcardCode: any, params?: {}): Promise<any>;
    verifyGiftCode(id: string, params?: {}): Promise<any>;
    fetchBorrowInterest(code?: Str, symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseBorrowInterest(info: any, market?: Market): {
        account: string;
        symbol: string;
        marginMode: string;
        currency: string;
        interest: number;
        interestRate: number;
        amountBorrowed: number;
        timestamp: number;
        datetime: string;
        info: any;
    };
    repayCrossMargin(code: string, amount: any, params?: {}): Promise<{
        id: number;
        currency: string;
        amount: any;
        symbol: any;
        timestamp: any;
        datetime: any;
        info: any;
    }>;
    repayIsolatedMargin(symbol: string, code: string, amount: any, params?: {}): Promise<{
        id: number;
        currency: string;
        amount: any;
        symbol: any;
        timestamp: any;
        datetime: any;
        info: any;
    }>;
    borrowCrossMargin(code: string, amount: number, params?: {}): Promise<{
        id: number;
        currency: string;
        amount: any;
        symbol: any;
        timestamp: any;
        datetime: any;
        info: any;
    }>;
    borrowIsolatedMargin(symbol: string, code: string, amount: number, params?: {}): Promise<{
        id: number;
        currency: string;
        amount: any;
        symbol: any;
        timestamp: any;
        datetime: any;
        info: any;
    }>;
    parseMarginLoan(info: any, currency?: Currency): {
        id: number;
        currency: string;
        amount: any;
        symbol: any;
        timestamp: any;
        datetime: any;
        info: any;
    };
    fetchOpenInterestHistory(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OpenInterest[]>;
    fetchOpenInterest(symbol: string, params?: {}): Promise<OpenInterest>;
    parseOpenInterest(interest: any, market?: Market): OpenInterest;
    fetchMyLiquidations(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Liquidation[]>;
    parseLiquidation(liquidation: any, market?: Market): Liquidation;
    fetchGreeks(symbol: string, params?: {}): Promise<Greeks>;
    parseGreeks(greeks: any, market?: Market): {
        symbol: string;
        timestamp: any;
        datetime: any;
        delta: number;
        gamma: number;
        theta: number;
        vega: number;
        rho: any;
        bidSize: any;
        askSize: any;
        bidImpliedVolatility: number;
        askImpliedVolatility: number;
        markImpliedVolatility: number;
        bidPrice: any;
        askPrice: any;
        markPrice: number;
        lastPrice: any;
        underlyingPrice: any;
        info: any;
    };
    fetchTradingLimits(symbols?: Strings, params?: {}): Promise<{}>;
    fetchPositionMode(symbol?: Str, params?: {}): Promise<{
        info: any;
        hedged: boolean;
    }>;
    fetchMarginModes(symbols?: string[], params?: {}): Promise<MarginModes>;
    parseMarginMode(marginMode: any, market?: any): MarginMode;
}
