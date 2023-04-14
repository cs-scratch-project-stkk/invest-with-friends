const validator = {};

validator.addHolding = (req, res, next) => {
	const { user_id, ticker, stock_quantity } = req.body.stockData;

	if (typeof user_id === 'number' && typeof ticker === 'string' && typeof stock_quantity === 'number') {
		return next();
	} else {
		return next(`
      error: req.body
      expected: 
        {
          user_id: <number>,
          ticker: <string>,
          stock_quantity: <number>,
        }
      received:
        {
          user_id: ${user_id} <${typeof user_id}>,   
          ticker: ${ticker} <${typeof ticker}>,
          stock_quantity: ${stock_quantity} <${typeof stock_quantity}>,
        }
      req.body: ${JSON.stringify(req.body)}
    `);
	}
};

module.exports = validator;