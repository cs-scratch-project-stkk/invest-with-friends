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

const STOCK_URL = '/stockData';

function Profile({ user }) {
	const Search = styled('div')(({ theme }) => ({
		backgroundColor: '#F2F2F2',
		padding: '0 10px',
		borderRadius: theme.shape.borderRadius,
		width: '20%',
	}));

	const [stocksData, setStocksData] = useState([]);

	return (
		<>
			<CssBaseline />
			<Box>
				<Typography sx={{ textAlign: 'left', paddingTop: '30px' }}>Hello {user.firstName} </Typography>
				<Search sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
					<InputBase placeholder="Search friend..." />
					<SearchIcon sx={{ color: 'gray', width: '10%' }} />
				</Search>

				<Stack direction="row" spacing={1} mt={2}>
					<SideNavbar />
					<Stack direction="column">
						<StockForm stocksData={stocksData} setStocksData={setStocksData} />
						<TablePortfolio stocksData={stocksData} setStocksData={setStocksData} />
						<CustomPieChart stocksData={stocksData} setStocksData={setStocksData} />
					</Stack>
				</Stack>
			</Box>
		</>
	);
}

export default Profile;
