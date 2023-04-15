import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../api/axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FriendPieChart = ({ friendID }) => {
	const GETFRIENDHOLDINGS_URL = `/api/getFriendHoldings/${friendID}`;

	const [friendHoldings, setFriendHoldings] = useState([]);

	// percent_of_holdings
	// ticker

	useEffect(() => {
		const getAllFriendHoldings = async () => {
			try {
				const response = await axios.get(GETFRIENDHOLDINGS_URL);
				if (response.data) {
					setFriendHoldings(response.data);
				}
			} catch (error) {
				toast.error('Server did not retrieve data appropriately.');
			}
		};
		getAllFriendHoldings();
	}, []);
	console.log(friendHoldings);

	const tickers = friendHoldings.map((stock) => stock.ticker);
	// const quantity = stocksData.map((stock) => stock.stock_quantity);
	const numberfy = () => {
		const percent = friendHoldings.map((stock) => stock.percent_of_holdings);
		const finalData = [];
		for (let i = 0; i < percent.length; i++) {
			finalData.push(Number(percent[i].slice(0, -2)));
		}
		return finalData;
	};
	const numberHoldings = numberfy();

	const data = {
		labels: tickers,
		datasets: [
			{
				label: 'Percentage of Holdings',
				data: numberHoldings,
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1,
			},
		],
	};

	return (
		<>
			<Pie data={data}></Pie>
		</>
	);
};

export default FriendPieChart;

{
	/*<h1>{JSON.stringify(friendHoldings)}</h1>*/
}
