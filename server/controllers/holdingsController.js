const {getHoldings} = require('../services/holdingsService')

const holdingsController = {};

holdingsController.getHoldings = async (req, res, next) => {
    try {
        const  user_id  = req.params.id;
        res.locals.holdings = await getHoldings(user_id);
        return next();
    } catch(err) {
        return next(err)
    }
}

holdingsController.addHolding = async (req, res, next) => {
    try {
        const {user_id, ticker, shares}  = req.body;
        res.locals.addHoldingSuccess = await addHolding(user_id, ticker, shares);
        return next();
    } catch(err) {
        return next(err)
    }
}

holdingsController.updateHolding = async (req, res, next) => {
    try {
        const {user_id, ticker, shares}  = req.body;
        res.locals.updateHoldingSuccess = await updateHolding(user_id, ticker, shares);
        return next();
    } catch(err) {
        return next(err)
    }
}

holdingsController.deleteHolding = async (req, res, next) => {
    try {
        const {user_id, ticker}  = req.body;
        res.locals.deleteHoldingSuccess = await updateHolding(user_id, ticker);
        return next();
    } catch(err) {
        return next(err)
    }
}

module.exports = holdingsController;