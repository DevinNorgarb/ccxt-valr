// -------------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -------------------------------------------------------------------------------

namespace ccxt;

public partial class coinbaseinternational : Exchange
{
    public coinbaseinternational (object args = null): base(args) {}

    public async Task<object> v1PublicGetAssets (object parameters = null)
    {
        return await this.callAsync ("v1PublicGetAssets",parameters);
    }

    public async Task<object> v1PublicGetAssetsAssets (object parameters = null)
    {
        return await this.callAsync ("v1PublicGetAssetsAssets",parameters);
    }

    public async Task<object> v1PublicGetAssetsAssetNetworks (object parameters = null)
    {
        return await this.callAsync ("v1PublicGetAssetsAssetNetworks",parameters);
    }

    public async Task<object> v1PublicGetInstruments (object parameters = null)
    {
        return await this.callAsync ("v1PublicGetInstruments",parameters);
    }

    public async Task<object> v1PublicGetInstrumentsInstrument (object parameters = null)
    {
        return await this.callAsync ("v1PublicGetInstrumentsInstrument",parameters);
    }

    public async Task<object> v1PublicGetInstrumentsInstrumentQuote (object parameters = null)
    {
        return await this.callAsync ("v1PublicGetInstrumentsInstrumentQuote",parameters);
    }

    public async Task<object> v1PublicGetInstrumentsInstrumentFunding (object parameters = null)
    {
        return await this.callAsync ("v1PublicGetInstrumentsInstrumentFunding",parameters);
    }

    public async Task<object> v1PublicGet (object parameters = null)
    {
        return await this.callAsync ("v1PublicGet",parameters);
    }

    public async Task<object> v1PrivateGetOrders (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetOrders",parameters);
    }

    public async Task<object> v1PrivateGetOrdersId (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetOrdersId",parameters);
    }

    public async Task<object> v1PrivateGetPortfolios (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetPortfolios",parameters);
    }

    public async Task<object> v1PrivateGetPortfoliosPortfolio (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetPortfoliosPortfolio",parameters);
    }

    public async Task<object> v1PrivateGetPortfoliosPortfolioDetail (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetPortfoliosPortfolioDetail",parameters);
    }

    public async Task<object> v1PrivateGetPortfoliosPortfolioSummary (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetPortfoliosPortfolioSummary",parameters);
    }

    public async Task<object> v1PrivateGetPortfoliosPortfolioBalances (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetPortfoliosPortfolioBalances",parameters);
    }

    public async Task<object> v1PrivateGetPortfoliosPortfolioBalancesAsset (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetPortfoliosPortfolioBalancesAsset",parameters);
    }

    public async Task<object> v1PrivateGetPortfoliosPortfolioPositions (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetPortfoliosPortfolioPositions",parameters);
    }

    public async Task<object> v1PrivateGetPortfoliosPortfolioPositionsInstrument (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetPortfoliosPortfolioPositionsInstrument",parameters);
    }

    public async Task<object> v1PrivateGetPortfoliosFills (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetPortfoliosFills",parameters);
    }

    public async Task<object> v1PrivateGetPortfoliosPortfolioFills (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetPortfoliosPortfolioFills",parameters);
    }

    public async Task<object> v1PrivateGetTransfers (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetTransfers",parameters);
    }

    public async Task<object> v1PrivateGetTransfersTransferUuid (object parameters = null)
    {
        return await this.callAsync ("v1PrivateGetTransfersTransferUuid",parameters);
    }

    public async Task<object> v1PrivatePostOrders (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePostOrders",parameters);
    }

    public async Task<object> v1PrivatePostPortfolios (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePostPortfolios",parameters);
    }

    public async Task<object> v1PrivatePostPortfoliosMargin (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePostPortfoliosMargin",parameters);
    }

    public async Task<object> v1PrivatePostPortfoliosTransfer (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePostPortfoliosTransfer",parameters);
    }

    public async Task<object> v1PrivatePostTransfersWithdraw (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePostTransfersWithdraw",parameters);
    }

    public async Task<object> v1PrivatePostTransfersAddress (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePostTransfersAddress",parameters);
    }

    public async Task<object> v1PrivatePostTransfersCreateCounterpartyId (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePostTransfersCreateCounterpartyId",parameters);
    }

    public async Task<object> v1PrivatePostTransfersValidateCounterpartyId (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePostTransfersValidateCounterpartyId",parameters);
    }

    public async Task<object> v1PrivatePostTransfersWithdrawCounterparty (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePostTransfersWithdrawCounterparty",parameters);
    }

    public async Task<object> v1PrivatePutOrdersId (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePutOrdersId",parameters);
    }

    public async Task<object> v1PrivatePutPortfoliosPortfolio (object parameters = null)
    {
        return await this.callAsync ("v1PrivatePutPortfoliosPortfolio",parameters);
    }

    public async Task<object> v1PrivateDeleteOrders (object parameters = null)
    {
        return await this.callAsync ("v1PrivateDeleteOrders",parameters);
    }

    public async Task<object> v1PrivateDeleteOrdersId (object parameters = null)
    {
        return await this.callAsync ("v1PrivateDeleteOrdersId",parameters);
    }

}