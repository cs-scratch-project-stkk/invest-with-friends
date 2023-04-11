import React from 'react';
import { Box, styled, Typography, Stack, CssBaseline, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Container } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './pages/Profile';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function SideNavbar() {
	const navigate = useNavigate();

	const menuList = [
		{
			text: 'Homepage',
			path: '/dashboard',
			icon: <HomeIcon />,
		},
		{
			text: 'My Profile',
			path: '/profile',
			icon: <AccountBoxIcon />,
		},
		{
			text: 'Friends',
			path: '/friends',
			icon: <PeopleIcon />,
		},
	];

	return (
		<>
			<Box ml={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
				<List>
					{menuList.map((item) => (
						<ListItem disablePadding key={item.text} onClick={() => navigate(item.path)}>
							<ListItemButton>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</>
	);
}

export default SideNavbar;
