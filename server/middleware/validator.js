const validator = {};

validator.addHolding = (req, res, next) => {
  const { user_id, ticker, shares } = req.body

  if (typeof user_id === 'number' && typeof ticker === 'string' && typeof shares === 'number') {
    return next()
  }
  else {
    return next(`
      error: req.body
      expected: 
        {
          user_id: <number>,
          ticker: <string>,
          shares: <number>,
        }
      received:
        {
          user_id: ${user_id} <${typeof user_id}>,   
          ticker: ${ticker} <${typeof ticker}>,
          shares: ${shares} <${typeof shares}>,
        }
    `)
  }
};

module.exports = validator;