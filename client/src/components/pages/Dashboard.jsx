import React, { useState, useEffect } from 'react';
import { Box, styled, Typography, Stack, CssBaseline, InputBase } from '@mui/material';
import { Container } from '@mui/system';
import SideNavbar from '../SideNavbar';
import NewsFeed from '../NewsFeed';
import Rightbar from '../Rightbar';
import SearchIcon from '@mui/icons-material/Search';

function Dashboard({ user }) {
	const Search = styled('div')(({ theme }) => ({
		backgroundColor: '#F2F2F2',
		padding: '0 10px',
		borderRadius: theme.shape.borderRadius,
		width: '20%',
	}));

	useEffect(() => {
		localStorage.getItem('user');
	});

	return (
		<>
			<CssBaseline />
			<Box>
				<Typography sx={{ textAlign: 'left', paddingTop: '30px' }}>Hello {user.firstName} </Typography>
				<Search sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
					<InputBase placeholder="Search friend..." />
					<SearchIcon sx={{ color: 'gray', width: '10%' }} />
				</Search>

				<Stack direction="row" spacing={1} mt={2} justifyContent="space-between">
					<SideNavbar />
					<NewsFeed />
				</Stack>
			</Box>
		</>
	);
}

export default Dashboard;
