import React, { useState, useEffect } from 'react';
import { Box, styled, Typography, Stack, CssBaseline, InputBase, TextField, Button, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Container } from '@mui/system';
import toast, { Toaster } from 'react-hot-toast';
import RefreshIcon from '@mui/icons-material/Refresh';

function StockForm({ stocksData, setStocksData, user, setUser }) {
	const HOLDINGS_URL = `/holdings/${user.id}`;
	const ADDHOLDING_URL = '/api/addHolding';
	const UPDATEHOLDING_URL = '/api/updateHolding';
	const DELETEHOLDING_URL = '/api//deleteHolding';
	const [stockData, setStockData] = useState({
		user: `${user.id}`,
		ticker: '',
		company: '',
		closingPrice: '',
		shares: '',
		marketValue: '',
		percentHoldings: '',
	});

	const addOnClick = async (event) => {
		event.preventDefault();
		try {
			const existingStock = stocksData.find((data) => data.ticker === stockData.ticker);
			if (existingStock) {
				const updatedStock = { ...existingStock, shares: Number(existingStock.shares) + Number(stockData.shares) };

				const response = await axios.patch(UPDATEHOLDING_URL, JSON.stringify({ updatedStock }), {
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
			} else {
				const response = await axios.post(ADDHOLDING_URL, JSON.stringify({ stockData }), {
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				});
				if (response.data) {
					setStockData({
						user: `${user.id}`,
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
			}
			setStockData({
				ticker: '',
				shares: '',
			});
		} catch (err) {
			toast.error('The ticker does not exist.');
		}
	};

	const sellOnClick = async (event) => {
		event.preventDefault();
		try {
			const existingStock = stocksData.find((data) => data.ticker === stockData.ticker);
			if (existingStock) {
				const updatedStock = { ...existingStock, shares: Number(existingStock.shares) - Number(stockData.shares) };
				if (updatedStock.shares === 0) {
					const response = await axios.delete(DELETEHOLDING_URL, JSON.stringify({ updatedStock }), {
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true,
					});
				} else if (updatedStock.shares > 0) {
					const response = await axios.patch(UPDATEHOLDING_URL, JSON.stringify({ updatedStock }), {
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
				} else {
					toast.error('You do not have enough shares');
				}
			}
			setStockData({
				ticker: '',
				shares: '',
			});
		} catch (err) {
			toast.error('The ticker does not exist.');
		}
	};

	const refresh = async (event) => {
		try {
			const response = await axios.get(HOLDINGS_URL, JSON.stringify({ stocksData }), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
			if (response.data) {
				setStocksData(response.data);
			}
		} catch (error) {
			toast.error('Data was not able to be refreshed');
		}
	};

	return (
		<>
			<Box p={2}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
					<Button color="success" size="medium" type="submit" variant="contained" onClick={addOnClick}>
						BUY
					</Button>
					<Button color="error" size="medium" type="submit" variant="contained" onClick={sellOnClick}>
						SELL
					</Button>
					<IconButton color="primary" sx={{ ml: '10px' }} onClick={refresh}>
						<RefreshIcon fontSize="small" sx={{ color: '#0F1B4C' }} />
					</IconButton>
				</Box>
			</Box>
		</>
	);
}
export default StockForm;

// // Ted's code

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Table, TableBody, TableCell, TableHead, TableRow, Button} from '@mui/material';
// import { Add } from '@mui/icons-material';

// const StockFormTable = () => {
//   const [shares, setShares] = useState([]);
//   const [newShare, setNewShare] = useState({
//     ticker: '',
//     quantity: 0,
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewShare({ ...newShare, [name]: value });
//   };

//   const handleAddShare = () => {
//     axios.post('/api/addHolding', newShare)
//       .then(response => {
//         console.log('Added new stock:', response.data);
//         setShares([...shares, response.data]);
//         setNewShare({ ticker: '', quantity: 0 });
//       })
//       .catch(error => {
//         console.error('Error adding new stock:', error);
//       });
//   };

//   useEffect(() => {
//     axios.get('/api/holdings')
//       .then(response => {
//         setShares(response.data);
//       })
//       .catch(error => {
//         console.error('Error loading stocks:', error);
//       });
//   }, []);

//   return (
//     <>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                   <TextField
//                     type="text"
//                     name="ticker"
//                     value={newShare.ticker}
//                     onChange={(event) => handleInputChange(event)}
//                     label="Ticker"
//                   />
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   type="number"
//                   name="quantity"
//                   value={newShare.quantity}
//                   onChange={(event) => handleInputChange(event)}
//                   label="Quantity"
//                 />
//               </TableCell>
//               <TableCell>
//                 <Button
//                   onClick={handleAddShare}
//                   variant="contained"
//                   color="primary"
//                   startIcon={<Add />}
//                 >
//                   Add Share
//                 </Button>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//         </Table>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Ticker</TableCell>
//               <TableCell>Quantity</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {shares.map((share, index) => (
//               <TableRow key={index}>
//                 <TableCell>{share.ticker}</TableCell>
//                 <TableCell>{share.quantity}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//     </>
//   );
// };

// export default StockFormTable;

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

// const sellOnClick = async (event) => {
// 	event.preventDefault();
// 	try {
// 		const existingStock = stocksData.find((data) => data.ticker === stockData.ticker);
// 		if (existingStock) {
// 			const updatedStock = { ...existingStock, shares: Number(existingStock.shares) - Number(stockData.shares) };

// 			const response = await axios.patch(UPDATEHOLDING_URL, JSON.stringify({ updatedStock }), {
// 				headers: { 'Content-Type': 'application/json' },
// 				withCredentials: true,
// 			});
// 			if (response.data) {
// 				setStockData({
// 					ticker: response.data.ticker,
// 					company: response.data.company,
// 					closingPrice: response.data.closingPrice,
// 					shares: response.data.shares,
// 					marketValue: response.data.marketValue,
// 					percentHoldings: response.data.percentHoldings,
// 				});

// 				setStocksData((prev) => {
// 					const portfolio = [...prev, stockData];
// 					return portfolio;
// 				});
// 			}
// 		} else {
// 			const response = await axios.post(ADDHOLDING_URL, JSON.stringify({ stockData }), {
// 				headers: { 'Content-Type': 'application/json' },
// 				withCredentials: true,
// 			});
// 			if (response.data) {
// 				setStockData({
// 					user: `${user.id}`,
// 					ticker: response.data.ticker,
// 					company: response.data.company,
// 					closingPrice: response.data.closingPrice,
// 					shares: response.data.shares,
// 					marketValue: response.data.marketValue,
// 					percentHoldings: response.data.percentHoldings,
// 				});
// 				stocksData.map((data) => {
// 					if (stockData.ticker !== data.ticker) {
// 						setStocksData((prev) => {
// 							const portfolio = [...prev, stockData];
// 							return portfolio;
// 						});
// 					}
// 				});
// 			}
// 		}
// 		setStockData({
// 			ticker: '',
// 			shares: '',
// 		});
// 	} catch (err) {
// 		toast.error('The ticker does not exist.');
// 	}
// };
