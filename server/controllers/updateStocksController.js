const updateStocksService = require('../services/updateStocksService')

const updateStocksController = {};

updateStocksController.getTickers = async (req, res, next) => {
    try {
        res.locals.tickers = await updateStocksService.getTickers();
        return next();
    } catch(err) {
        return next(err)
    }
}

updateStocksController.getClosingPrice = async (req, res, next) => {
    try {
        res.locals.closingPrices = await updateStocksService.getClosingPrice(res.locals.tickers);
        next();
    } catch(err) {
        return next(err)
    }
}

// updateStocksController.getCompanyName = async (req, res, next) => {
//     try {
//         await updateStocksService.getCompanyName(res.locals.tickers);
//         return next();
//     } catch(err) {
//         return next(err)
//     }
// }


module.exports = updateStocksController;