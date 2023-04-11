import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import CustomPieChart from './CustomPieChart';

function TablePortfolio({ stocksData, setStocksData }) {
	let ticker = '';
	const stock = stocksData.map((stock) => {
		ticker = stock.ticker;
		return ticker;
	});

	return (
		<>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Ticker</TableCell>
						<TableCell>Company</TableCell>
						<TableCell>Closing Price</TableCell>
						<TableCell>Shares</TableCell>
						<TableCell>Market Value</TableCell>
						<TableCell>% of Holdings</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{stocksData.map((stock, index) => (
						<TableRow key={index}>
							<TableCell>{stock.ticker}</TableCell>
							<TableCell>{stock.company}</TableCell>
							<TableCell>{stock.closingPrice}</TableCell>
							<TableCell>{stock.shares}</TableCell>
							<TableCell>{stock.marketValue}</TableCell>
							<TableCell>{stock.percentHoldings}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}

export default TablePortfolio;
