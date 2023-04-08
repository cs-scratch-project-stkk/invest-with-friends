const db = require('../db/investWithFriendsDb');

const holdingsService = {};

holdingsService.getHoldings = async (id) => {
    const query = ('SELECT holdings.stock_quantity, stocks.ticker, stocks.company_name, stocks.closing_price, stocks.last_updated FROM "holdings" LEFT JOIN "stocks" ON "holdings"."stock_id"="stocks"."stock_id" WHERE "holder_id"=$1');
    const params = [id];

    const holdings = await db.query(query, params);

    return holdings.rows;
}

holdingsService.addHoldings = async (user_id, ticker, shares) => {
    //come back to this after figuring out API
    const query = ('SELECT holdings.stock_quantity, stocks.ticker, stocks.company_name, stocks.closing_price, stocks.last_updated FROM "holdings" LEFT JOIN "stocks" ON "holdings"."stock_id"="stocks"."stock_id" WHERE "holder_id"=$1');

    const params = [user_id, ticker, shares];

    const holdings = await db.query(query, params);

    return holdings.rows;
}

holdingsService.updateHoldings = async (user_id, ticker, shares) => {
  
    const query = ('SELECT holdings.stock_quantity, stocks.ticker, stocks.company_name, stocks.closing_price, stocks.last_updated FROM "holdings" LEFT JOIN "stocks" ON "holdings"."stock_id"="stocks"."stock_id" WHERE "holder_id"=$1');

    const params = [user_id, ticker, shares];

    const holdings = await db.query(query, params);

    return holdings.rows;
}
module.exports = holdingsService;
