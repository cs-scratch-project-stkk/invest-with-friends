import React, { useState, useEffect } from 'react';
import { Box, styled, Typography, Stack, CssBaseline, InputBase, TextField, Button } from '@mui/material';
import { Container } from '@mui/system';
import SideNavbar from '../SideNavbar';
import NewsFeed from '../NewsFeed';
import TablePortfolio from '../TablePortfolio';
import axios from '../../api/axios';
import SearchIcon from '@mui/icons-material/Search';
import StockForm from '../StockForm';
import CustomPieChart from '../CustomPieChart';
import toast, { Toaster } from 'react-hot-toast';

const STOCK_URL = '/stockData';

function Profile({ user, setUser }) {

	const Search = styled('div')(({ theme }) => ({
		backgroundColor: '#F2F2F2',
		padding: '0 10px',
		borderRadius: theme.shape.borderRadius,
		width: '20%',
	}));

	const [stocksData, setStocksData] = useState([]);
	// console.log(stocksData);

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user')));
	}, []);

	useEffect(() => {
		const getAllStocks = async (setStocksData) => {
			try {
				const response = await axios.get(STOCK_URL, JSON.stringify({ stockData }), {
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				});
				if (response.data) {
					setStocksData(response.data);
				}
			} catch (error) {
				toast.error('Server did not retrieve data appropriately.');
			}
		};
		getAllStocks();
	}, []);

	// const login = (userData) => {
	// 	// console.log(userData);
	// 	setUser({ id: userData.id, firstName: userData.firstName, lastName: userData.lastName, email: userData.email, password: userData.password });
	// 	localStorage.setItem('user', JSON.stringify(userData));
	// 	console.log('logged in confirmed');
	// };
	return (
		<>
			<CssBaseline />
			<CssBaseline />
			<Box sx={{ display: 'flex', mt: '40px' }}>
				<Container sx={{ width: '20%', ml: '110px' }}>
					<SideNavbar />
				</Container>
				<Container sx={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '10px' }}>
					<Typography sx={{ fontSize: '24px' }}>Hello {user.firstName}! </Typography>
					<Stack direction="row">
						<Stack direction="column">
							<StockForm stocksData={stocksData} setStocksData={setStocksData} user={user} setUser={setUser} />
							<TablePortfolio stocksData={stocksData} setStocksData={setStocksData} user={user} setUser={setUser} />
							<CustomPieChart stocksData={stocksData} setStocksData={setStocksData} user={user} setUser={setUser} />
						</Stack>
					</Stack>
				</Container>
			</Box>
		</>
	);
}

export default Profile;
