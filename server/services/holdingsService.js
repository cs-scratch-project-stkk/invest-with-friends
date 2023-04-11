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
  
    const query = ('UPDATE h SET h.stock_quantity = $3 FROM "holdings" h LEFT JOIN "stocks" s ON h."stock_id"=s."stock_id" WHERE "ticker"=$2 AND "holder_id"=$1');

    const params = [user_id, ticker, shares];

    const holdings = await db.query(query, params);

    return holdings.rowCount === 1;
}

holdingsService.deleteHoldings = async (user_id, ticker) => {
  
    const query = ('UPDATE h SET h.stock_quantity = $3 FROM "holdings" h LEFT JOIN "stocks" s ON h."stock_id"=s."stock_id" WHERE "ticker"=$2 AND "holder_id"=$1');

    const params = [user_id, ticker];

    const holdings = await db.query(query, params);

    return holdings.rowCount === 1;
}

module.exports = holdingsService;
