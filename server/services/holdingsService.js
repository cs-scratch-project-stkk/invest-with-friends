const db = require('../db/investWithFriendsDb');
const { getClosingPriceAxios, getCompanyName } = require('./updateStocksService');

const holdingsService = {};

holdingsService.getHoldings = async (id) => {
	const query =
		'SELECT holdings.holder_id AS user_id, holdings.stock_quantity, stocks.stock_id, stocks.ticker, stocks.company_name, stocks.closing_price, stocks.last_updated FROM "holdings" LEFT JOIN "stocks" ON "holdings"."stock_id"="stocks"."stock_id" WHERE "holder_id"=$1';
	const params = [id];

	let holdings = await db.query(query, params);
	holdings = holdings.rows;

	//calculate market value fo each holding and keep running total of total market value of holdings
	let totalMarketVal = 0;
	for (let i = 0; i < holdings.length; i++) {
		let marketValue = holdings[i].stock_quantity * holdings[i].closing_price;
		holdings[i].market_value = marketValue;
		totalMarketVal += marketValue;
	}

	//add percent of holdings property
	for (let i = 0; i < holdings.length; i++) {
		let percentOfHoldings = ((100 * holdings[i].market_value) / totalMarketVal).toFixed(2);
		holdings[i].percent_of_holdings = `${percentOfHoldings} %`;
	}
	holdings.map((holding) => {
		holding.closing_price = `$ ${holding.closing_price}`;
		holding.market_value = `$ ${holding.market_value.toFixed(2)}`;
	});
	return holdings;
};

holdingsService.addHoldingExisting = async (user_id, ticker, shares) => {
	const query = `
        INSERT INTO holdings (holder_id, stock_quantity, stock_id) 
        SELECT $1, $3, (
            SELECT stock_id 
            FROM stocks
            WHERE stocks.ticker = $2
            )
        WHERE EXISTS (
            SELECT * 
            FROM stocks 
            WHERE stocks.ticker = $2
        );
    `;
	const params = [user_id, ticker, shares];
	const response = await db.query(query, params);

	return response.rowCount === 1;
};

holdingsService.addHoldingNew = async (user_id, ticker, shares) => {

	const companyName = await getCompanyName(ticker);
	const closingPrice = await getClosingPriceAxios(ticker);
	const lastUpdated = Math.floor(Date.now() / 1000);

	const query = `
        WITH first_insert AS (
            INSERT INTO stocks (ticker, company_name, closing_price, last_updated)
            VALUES ($1, $2, $3, $4)
            RETURNING stock_id
        )
        INSERT INTO holdings (holder_id, stock_id, stock_quantity)
        VALUES ($5, (SELECT stock_id FROM first_insert), $6);
    `;
	const params = [ticker, companyName, closingPrice, lastUpdated, user_id, shares];
	const response = await db.query(query, params);

	return response.rowCount === 1;
};

holdingsService.updateHolding = async (user_id, ticker, shares) => {
	const query = 'UPDATE holdings AS h SET stock_quantity = $3 FROM stocks AS s WHERE h.stock_id = s.stock_id AND s.ticker = $2 AND h.holder_id = $1';
	const params = [user_id, ticker, shares];
	const holdings = await db.query(query, params);

	return holdings.rowCount === 1;
};

holdingsService.deleteHolding = async (user_id, ticker) => {
	const query = 'DELETE FROM holdings AS h USING stocks AS s WHERE h.stock_id = s.stock_id AND s.ticker = $2 AND h.holder_id = $1;';
	const params = [user_id, ticker];
	const holdings = await db.query(query, params);

	return holdings.rowCount === 1;
};

holdingsService.deleteSomeHoldingInfo = async (holdings) => {
	for (let i = 0; i < holdings.length; i++) {
		delete holdings[i].stock_quantity;
		delete holdings[i].last_updated;
		delete holdings[i].market_value;
	}
	return holdings;
};
module.exports = holdingsService;
