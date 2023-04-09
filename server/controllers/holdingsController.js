const {getHoldings} = require('../services/holdingsService')

const holdingsController = {};

holdingsController.getHoldings = async (req, res, next) => {
    try {
        const  user_id  = req.params.id;
        console.log(user_id)
        res.locals.holdings = await getHoldings(user_id);
        return next();
    } catch(err) {
        return next(err)
    }
}

module.exports = holdingsController;