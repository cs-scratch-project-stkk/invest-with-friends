const holdingsService = require('../services/holdingsService');

const holdingsController = {};

holdingsController.getHoldings = async (req, res, next) => {
	try {
		const user_id = req.params.id;
		res.locals.holdings = await holdingsService.getHoldings(user_id);
		return next();
	} catch (err) {
		return next(err);
	}
};

holdingsController.addHolding = async (req, res, next) => {
	try {
		const { user_id, ticker, stock_quantity } = req.body;

		res.locals.addHoldingSuccess = (await holdingsService.addHoldingExisting(user_id, ticker, stock_quantity)) || (await holdingsService.addHoldingNew(user_id, ticker, stock_quantity));

		res.locals.holdings = await holdingsService.getHoldings(user_id);
		return next();
	} catch (err) {
		return next(err);
	}
};

holdingsController.updateHolding = async (req, res, next) => {
	try {
		const { user_id, ticker, stock_quantity } = req.body;
		res.locals.updateHoldingSuccess = await holdingsService.updateHolding(user_id, ticker, stock_quantity);
		res.locals.holdings = await holdingsService.getHoldings(user_id);
		return next();
	} catch (err) {
		return next(err);
	}
};

holdingsController.deleteHolding = async (req, res, next) => {
	try {
		const { user_id, ticker } = req.body;
		res.locals.deleteHoldingSuccess = await holdingsService.deleteHolding(user_id, ticker);
		res.locals.holdings = await holdingsService.getHoldings(user_id);
		return next();
	} catch (err) {
		return next(err);
	}
};

holdingsController.getFriendHoldings = async (req, res, next) => {
	try {
		const friend_id = req.params.id;
		res.locals.holdings = await holdingsService.getHoldings(friend_id);
		res.locals.holdings = await holdingsService.deleteSomeHoldingInfo(res.locals.holdings);
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = holdingsController;
