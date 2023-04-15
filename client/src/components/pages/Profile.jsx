import React, { useState, useEffect } from 'react';
import { Box, styled, Typography, Stack, CssBaseline, InputBase, TextField, Button } from '@mui/material';
import { Container } from '@mui/system';
import SideNavbar from '../SideNavbar';
import NewsFeed from '../NewsFeed';
import TablePortfolio from '../TablePortfolio';
import axios from '../../api/axios';
import SearchIcon from '@mui/icons-material/Search';
import StockForm from '../StockForm';
import PieChart from '../CustomPieChart';
import toast, { Toaster } from 'react-hot-toast';
import CustomButton from '../CustomButton';

function Profile({ user, setUser }) {
	const HOLDINGS_URL = `api/getHoldings/${user.id}`;

	const Search = styled('div')(({ theme }) => ({
		backgroundColor: '#F2F2F2',
		padding: '0 10px',
		borderRadius: theme.shape.borderRadius,
		width: '20%',
	}));

	const [stocksData, setStocksData] = useState([]);

	// useEffect(() => {
	// 	setUser(JSON.parse(localStorage.getItem('user')));
	// }, []);

	useEffect(() => {
		console.log(user);
		if (user.id) {
			const getAllStocks = async () => {
				console.log('A');
				try {
					const response = await axios.get(HOLDINGS_URL);
					if (response.data) {
						setStocksData(response.data);
					}
				} catch (error) {
					toast.error('Server did not retrieve data appropriately.');
				}
			};
			getAllStocks();
		}
	}, [user]);

	// const [loading, setLoading] = useState(false);
	// const Loading = () => {
	// 	return <p>Loading...</p>;
	// };

	return (
		<>
			<CssBaseline />
			<Box sx={{ display: 'flex', mt: '40px' }}>
				<Container sx={{ width: '20%', ml: '110px' }}>
					<SideNavbar />
				</Container>
				<Container sx={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '10px' }}>
					<Typography sx={{ fontSize: '24px', paddingLeft: '15px' }}>Hello {user.firstName}! </Typography>
					<Stack direction="row">
						<Stack direction="column">
							<StockForm stocksData={stocksData} setStocksData={setStocksData} user={user} setUser={setUser} />
							<TablePortfolio stocksData={stocksData} setStocksData={setStocksData} user={user} setUser={setUser} />
							<PieChart stocksData={stocksData} setStocksData={setStocksData} user={user} setUser={setUser} />
						</Stack>
					</Stack>
				</Container>
			</Box>
		</>
	);
}

export default Profile;

{
	/* <CustomPieChart stocksData={stocksData} setStocksData={setStocksData} user={user} setUser={setUser} /> */
}
