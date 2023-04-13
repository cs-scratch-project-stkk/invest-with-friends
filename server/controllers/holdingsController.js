const holdingsService = require('../services/holdingsService')

const holdingsController = {};

holdingsController.getHoldings = async (req, res, next) => {
    try {
        const  user_id  = req.params.id;
        res.locals.holdings = await holdingsService.getHoldings(user_id);
        return next();
    } catch(err) {
        return next(err)
    }
}

holdingsController.addHolding = async (req, res, next) => {
    try {
        const {user_id, stock_id, ticker, shares}  = req.body;
        res.locals.addHoldingSuccess = await holdingsService.addHolding(user_id, stock_id, ticker, shares);
        res.locals.holdings = await holdingsService.getHoldings(user_id);
        return next();
    } catch(err) {
        return next(err)
    }
}

holdingsController.updateHolding = async (req, res, next) => {
    try {
        const {user_id, ticker, shares}  = req.body;
        res.locals.updateHoldingSuccess = await holdingsService.updateHolding(user_id, ticker, shares);
        res.locals.holdings = await holdingsService.getHoldings(user_id);
        return next();
    } catch(err) {
        return next(err)
    }
}

holdingsController.deleteHolding = async (req, res, next) => {
    try {
        const {user_id, ticker}  = req.body;
        res.locals.deleteHoldingSuccess = await holdingsService.deleteHolding(user_id, ticker);
        res.locals.holdings = await holdingsService.getHoldings(user_id);
        return next();
    } catch(err) {
        return next(err)
    }
}

module.exports = holdingsController;