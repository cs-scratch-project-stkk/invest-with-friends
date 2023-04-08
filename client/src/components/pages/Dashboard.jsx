import React from 'react';
import { Typography } from '@mui/material';

function Dashboard({ user }) {
	console.log(user);
	return (
		<>
			<Typography sx={{ textAlign: 'center', paddingTop: '50px' }}>Hello {user.firstName} </Typography>
		</>
	);
}

export default Dashboard;
