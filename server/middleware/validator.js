const validator = {};

validator.addHolding = (req, res, next) => {
	const { user_id, ticker, stock_quantity } = req.body;
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

validator.deleteHolding = (req, res, next) => {
	const { user_id, ticker } = req.body;
	if (typeof user_id === 'number' && typeof ticker === 'string') {
		return next();
	} else {
		return next(`
      error: req.body
      expected: 
        {
          user_id: <number>,
          ticker: <string>,
        }
      received:
        {
          user_id: ${user_id} <${typeof user_id}>,   
          ticker: ${ticker} <${typeof ticker}>,
        }
      req.body: ${JSON.stringify(req.body)}
    `);
	}
};

validator.relationships = (req, res, next) => {
  const { user_id, first_name, last_name } = req.body;
	if (typeof user_id === 'number' && typeof ticker === 'string') {
		return next();
	} else {
		return next(`
      error: req.body
      expected: 
        {
          user_id: <number>,
          first_name: <string>,
          last_name: <string>,
        }
      received:
        {
          user_id: ${user_id} <${typeof user_id}>,   
          first_name: ${first_name} <${typeof first_name}>,
          last_name: ${last_name} <${typeof last_name}>,
        }
      req.body: ${JSON.stringify(req.body)}
    `);
	}
}

module.exports = validator;
