import React from 'react';
import { Box, styled, Typography, Stack, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function NewsFeed({ portfolio, stocksData, setStocksData }) {
	// useEffect(() => {
	// 	JSON.parse(localStorage.getItem('stocksData'));
	// }, []);

	return (
		<>
			<Box bgcolor="#fff" flex={4} mt={2}>
				<Typography>Newsfeed Under Construction.</Typography>
			</Box>
		</>
	);
}

export default NewsFeed;
