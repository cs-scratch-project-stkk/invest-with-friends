const db = require('../db/investWithFriendsDb');
const { API_KEY } = require('../utils/config')
var request = require('request');
const axios = require('axios');

const updateStocksService = {};


updateStocksService.getTickers = async () => {
    const query = ('SELECT ticker FROM stocks');
    const tickers = await db.query(query);
    const tickersArr = [];
    for (let i = 0; i < tickers.rows.length; i++){
        tickersArr.push(tickers.rows[i].ticker)
    }
    return tickersArr;
}

updateStocksService.getClosingPriceAxios = async (ticker) => {
    const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
            function: 'TIME_SERIES_DAILY_ADJUSTED',
            symbol: ticker,
            apikey: API_KEY,
        },
        headers: {
            'User-Agent': 'request'
        },
    });
    const lastDate = Object.keys(response.data['Time Series (Daily)'])[0];
    const closingPrice = Number(response.data['Time Series (Daily)'][lastDate]['4. close']);
    return closingPrice;
}

updateStocksService.updateClosingPrices = async (ticker, closingPrice) => {
    const query = ('UPDATE stocks SET closing_price = $2, last_updated = $3 WHERE ticker = $1');
    const params = [ticker, closingPrice, Math.floor(Date.now()/1000)]
    const update = await db.query(query, params);
    return update.rowCount === 1;
}

// updateStocksService.getCompanyName = async (tickers) => {
//     const query = ('SELECT holdings.stock_quantity, stocks.ticker, stocks.company_name, stocks.closing_price, stocks.last_updated FROM "holdings" LEFT JOIN "stocks" ON "holdings"."stock_id"="stocks"."stock_id" WHERE "holder_id"=$1');
//     const params = [id];

//     const holdings = await db.query(query, params);

//     return holdings.rows;
// }

module.exports = updateStocksService;