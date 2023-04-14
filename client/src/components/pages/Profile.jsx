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
import CustomButton from '../CustomButton';


function Profile({ user, setUser }) {
	const HOLDINGS_URL = `/holdings/${user.id}`;

	const Search = styled('div')(({ theme }) => ({
		backgroundColor: '#F2F2F2',
		padding: '0 10px',
		borderRadius: theme.shape.borderRadius,
		width: '20%',
	}));

	const [stocksData, setStocksData] = useState([]);

	const publish = async(event) => {
		event.preventDefault();
		try {
		  const response = axios.get(HOLDINGS_URL, JSON.stringify({ stocksData }), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
			if (response.data) {
				localStorage.setItem('stocksData', JSON.stringify(response.data));
				<NewsFeed portfolio={response.data} stocksData = {stocksData} setStocksData={setStocksData}/>
			}
		
		
		} catch (error) {
			toast.error('Sorry, you cannot publish.')
		}
	}

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user')));
	}, []);

	useEffect(() => {
		const getAllStocks = async () => {
			try {
				const response = await axios.get(HOLDINGS_URL, JSON.stringify({ stocksData }), {
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

	useEffect(() => {
		const getAllStocks = async () => {
			try {
				const response = await axios.get(HOLDINGS_URL, JSON.stringify({ stocksData }), {
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
	}, [stocksData]);

	return (
		<>
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
							<Button variant="outlined" sx={{width:200, mt:'20px'}} onClick={publish}>Publish to Newsfeed</Button>
						</Stack>
					</Stack>
				</Container>
			</Box>
		</>
	);
}

export default Profile;


