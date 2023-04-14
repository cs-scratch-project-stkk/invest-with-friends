import React from 'react';
import { Box, styled, Typography, Stack, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function NewsFeed({ portfolio, stocksData,setStocksData }) {

	// useEffect(() => {
	// 	JSON.parse(localStorage.getItem('stocksData'));
	// }, []);


	return (
		<>
			<Box bgcolor="#FAFAFA" flex={4} p={2}>
			<Typography>Newsfeed</Typography>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Ticker</TableCell>
						<TableCell>Company</TableCell>
						<TableCell>% of Holdings</TableCell>
					</TableRow>
				</TableHead>
				{/* <TableBody>
					{portfolio.map((stock, index) => (
						<TableRow key={index}>
							<TableCell>{stock.ticker}</TableCell>
							<TableCell>{stock.company}</TableCell>
							<TableCell>{stock.percentHoldings}</TableCell>
						</TableRow>
					))}
				</TableBody> */}
			</Table>
			</Box>
		</>
	);
}

export default NewsFeed;
