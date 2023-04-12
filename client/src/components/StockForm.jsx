import React, { useState, useEffect } from 'react';
import { Box, styled, Typography, Stack, CssBaseline, InputBase, TextField, Button, Grid } from '@mui/material';
import { Container } from '@mui/system';
import toast, { Toaster } from 'react-hot-toast';

function StockForm({ stocksData, setStocksData, user, setUser }) {
	const [stockData, setStockData] = useState({
		ticker: '',
		company: '',
		closingPrice: '',
		shares: '',
		marketValue: '',
		percentHoldings: '',
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(STOCK_URL, JSON.stringify({ stockData }), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
			if (response.data) {
				setStockData({
					ticker: response.data.ticker,
					company: response.data.company,
					closingPrice: response.data.closingPrice,
					shares: response.data.shares,
					marketValue: response.data.marketValue,
					percentHoldings: response.data.percentHoldings,
				});

				setStocksData((prev) => {
					const portfolio = [...prev, stockData];
					return portfolio;
				});
			}
			setStockData({
				ticker: '',
				shares: '',
			});
		} catch (err) {
			toast.error('The ticker does not exist.');
		}
	};
  
	return (
		<>
			<Box bgcolor="#FAFAFA" p={2}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} component="form" onSubmit={handleSubmit}>
					<TextField
						size="small"
						id="ticker"
						label="Ticker"
						name="ticker"
						value={stockData.ticker}
						onChange={(e) =>
							setStockData({
								...stockData,
								ticker: e.target.value.toUpperCase(),
							})
						}
						required
					/>
					<TextField
						sx={{ width: '20%' }}
						size="small"
						id="shares"
						label="Quantity"
						name="shares"
						type="number"
						value={stockData.shares}
						onChange={(e) => setStockData({ ...stockData, shares: e.target.value })}
						required
					/>
					<Button color="success" size="medium" type="submit" variant="contained">
						BUY
					</Button>
					<Button color="error" size="medium" type="submit" variant="contained">
						SELL
					</Button>
				</Box>
			</Box>
		</>
	);
}
export default StockForm;

// localStorage Old code
// import React, { useState, useEffect } from 'react';
// import { Box, styled, Typography, Stack, CssBaseline, InputBase, TextField, Button, Grid } from '@mui/material';
// import { Container } from '@mui/system';
// import toast, { Toaster } from 'react-hot-toast';

// function StockForm({ stocksData, setStocksData, user, setUser }) {
// 	const [stockData, setStockData] = useState({
// 		ticker: '',
// 		company: '',
// 		closingPrice: '',
// 		shares: '',
// 		marketValue: '',
// 		percentHoldings: '',
// 	});

// 	const handleSubmit = async (event) => {
// 		event.preventDefault();
// 		try {
// 			setStocksData((prev) => {
// 				const listPortfolio = [...prev, stockData];
// 				// localStorage.setItem('listPortfolio', JSON.stringify(listPortfolio));
// 				console.log(listPortfolio);
// 				return listPortfolio;
// 			});
// 			setStockData({
// 				ticker: '',
// 				shares: '',
// 			});
// 			// const response = await axios.post(STOCK_URL, JSON.stringify({ stockData }), {
// 			// 	headers: { 'Content-Type': 'application/json' },
// 			// 	withCredentials: true,
// 			// });
// 			// if (response.data) {
// 			// }
// 		} catch (err) {
// 			toast.error('The ticker does not exist.');
// 		}
// 	};

// 	// mock data
// 	const mockData = [
// 		{
// 			ticker: 'AAPL',
// 			company: 'Apple Inc',
// 			closingPrice: '164.66',
// 			shares: '',
// 			marketValue: '',
// 			percentHoldings: '',
// 		},
// 		{ ticker: 'MSFT', company: 'Microsoft Corp', closingPrice: '291.60', shares: '', marketValue: '', percentHoldings: '' },
// 		{ ticker: 'TSLA', company: 'Tesla Inc', closingPrice: '185.06', shares: '', marketValue: '', percentHoldings: '' },
// 	];
// 	let company;
// 	let closingPrice;
// 	let marketValue;
// 	let per;

// 	const mockCompanyFunction = (ticker) => {
// 		mockData.map((data) => {
// 			if (data.ticker === ticker) {
// 				company = data.company;
// 			}
// 		});
// 		return company;
// 	};

// 	const mockClosingPriceFunction = (ticker) => {
// 		mockData.map((data) => {
// 			if (data.ticker === ticker) {
// 				closingPrice = data.closingPrice;
// 			}
// 		});
// 		return closingPrice;
// 	};

// 	const mockMarketValueFunction = (qty) => {
// 		mockData.map((data) => {
// 			if (data.ticker === stockData.ticker) {
// 				marketValue = `${(data.closingPrice * qty).toFixed(2)}`;
// 			}
// 		});

// 		return marketValue;
// 	};

// 	const mockPercentFunction = (qty) => {
// 		mockData.map((data) => {
// 			if (data.ticker === stockData.ticker) {
// 				per = stockData.marketValue / stockData.marketValue;
// 			}
// 		});
// 		return per;
// 	};

// 	return (
// 		<>
// 			<Box bgcolor="#FAFAFA" p={2}>
// 				<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} component="form" onSubmit={handleSubmit}>
// 					<TextField
// 						size="small"
// 						id="ticker"
// 						label="Ticker"
// 						name="ticker"
// 						value={stockData.ticker}
// 						onChange={(e) =>
// 							setStockData({
// 								...stockData,
// 								ticker: e.target.value.toUpperCase(),
// 								company: mockCompanyFunction(e.target.value.toUpperCase()),
// 								closingPrice: mockClosingPriceFunction(e.target.value.toUpperCase()),
// 							})
// 						}
// 						required
// 					/>
// 					<TextField
// 						sx={{ width: '20%' }}
// 						size="small"
// 						id="shares"
// 						label="Quantity"
// 						name="shares"
// 						type="number"
// 						value={stockData.shares}
// 						onChange={(e) => setStockData({ ...stockData, shares: e.target.value, marketValue: mockMarketValueFunction(e.target.value), percentHoldings: mockPercentFunction(e.target.value) })}
// 						required
// 					/>
// 					<Button color="success" size="medium" type="submit" variant="contained">
// 						BUY
// 					</Button>
// 					<Button color="error" size="medium" type="submit" variant="contained">
// 						SELL
// 					</Button>
// 				</Box>
// 			</Box>
// 		</>
// 	);
// }
// export default StockForm;