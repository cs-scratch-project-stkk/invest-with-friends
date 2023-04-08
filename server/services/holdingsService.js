const db = require('../db/investWithFriendsDb');

const holdingsService = {};

holdingsService.getHoldings = async (id) => {
    console.log(id)
    const query = ('SELECT holdings.stock_quantity, stocks.ticker, stocks.company_name, stocks.closing_price, stocks.last_updated FROM "holdings" LEFT JOIN "stocks" ON "holdings"."stock_id"="stocks"."stock_id" WHERE "holder_id"=$1');
    const params = [id];

    const holdings = await db.query(query, params);
    // console.log(holdings)

    return holdings.rows;
}

module.exports = holdingsService;
