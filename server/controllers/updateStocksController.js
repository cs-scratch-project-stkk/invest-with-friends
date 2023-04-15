const updateStocksService = require('../services/updateStocksService');
const holdingsService = require('../services/holdingsService');

const updateStocksController = {};

updateStocksController.getTickers = async (req, res, next) => {
	try {
		res.locals.tickers = await updateStocksService.getTickers();
		return next();
	} catch (err) {
		return next(err);
	}
};

updateStocksController.getClosingPrice = async (req, res, next) => {
	// if (!res.locals.newStock) return
	try {
		res.locals.updateClosingPriceSuccess = true;
		for (let i = 0; i < res.locals.tickers.length; i++) {
			let closingPrice = await updateStocksService.getClosingPriceAxios(res.locals.tickers[i]);
			result = await updateStocksService.updateClosingPrices(res.locals.tickers[i], closingPrice);
			// if (!result) res.locals.updateClosingPriceSuccess = false;
		}
		const user_id = req.params.id;
		res.locals.holdings = await holdingsService.getHoldings(user_id);
		next();
	} catch (err) {
		return next(err);
	}
};

// updateStocksController.getCompanyName = async (req, res, next) => {
//     try {
//         await updateStocksService.getCompanyName(res.locals.tickers);
//         return next();
//     } catch(err) {
//         return next(err)
//     }
// }

module.exports = updateStocksController;
