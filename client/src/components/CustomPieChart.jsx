import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function CustomPieChart({ stocksData, setStocksData }) {
	// console.log(stocksData);

	return (
		<>
			{/* <ResponsiveContainer width="100%" height="100%">
				<PieChart style={{ height: '500px' }}>
					<Pie dataKey="percentHoldings" isAnimationActive={false} data={stocksData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
					<Tooltip />
				</PieChart>
			</ResponsiveContainer> */}
		</>
	);
}

export default CustomPieChart;
