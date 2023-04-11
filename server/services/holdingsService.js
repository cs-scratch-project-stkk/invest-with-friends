const db = require('../db/investWithFriendsDb');

const holdingsService = {};

holdingsService.getHoldings = async (id) => {
    const query = ('SELECT holdings.stock_quantity, stocks.ticker, stocks.company_name, stocks.closing_price, stocks.last_updated FROM "holdings" LEFT JOIN "stocks" ON "holdings"."stock_id"="stocks"."stock_id" WHERE "holder_id"=$1');
    const params = [id];

    let holdings = await db.query(query, params);
    holdings = holdings.rows

    //calculate market value fo each holding and keep running total of total market value of holdings
    let totalMarketVal = 0;
    for (let i = 0; i < holdings.length; i++){
        let marketValue = holdings[i].stock_quantity * holdings[i].closing_price;
        holdings[i].market_value = marketValue;
        totalMarketVal+=marketValue;
    }

    //add percent of holdings property
    for (let i = 0; i < holdings.length; i++){
        let percentOfHoldings = holdings[i].market_value/totalMarketVal;
        holdings[i].percent_of_holdings = percentOfHoldings;
    }

    return holdings;
}

holdingsService.addHolding = async (user_id, ticker, shares) => {
    //check to see if ticker exists on current database
    const query = ('SELECT stock_id FROM stocks WHERE ticker=$1');
    const params = [ticker];
    const stock_id = await db.query(query, params);

    //stock exists on the database
    if (stock_id.rows){
        const query = ('INSERT INTO holdings (holder_id,stock_id,stock_quantity) VALUES ($1,$2,$3)');
        const params =[user_id, stock_id.rows[0].stock_id, shares];
        const holdings = await db.query(query, params);
        return holdings.rowCount === 1;
    } 
    //stock doesn't exist on database
    else{
        res.locals.newStock = true;
    }

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
