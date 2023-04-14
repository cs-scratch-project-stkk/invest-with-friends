import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, styled, Typography, Stack, CssBaseline, InputBase, TextField, Button, Grid } from '@mui/material';
import { Container } from '@mui/system';
import SideNavbar from '../SideNavbar';
import NewsFeed from '../NewsFeed';
import TablePortfolio from '../TablePortfolio';
import axios from '../../api/axios';
import SearchIcon from '@mui/icons-material/Search';
import StockForm from '../StockForm';
import CustomPieChart from '../CustomPieChart';
import toast, { Toaster } from 'react-hot-toast';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFriends from '../TableFriends';

function Friends({ user, setUser }) {
	const ADDFRIENDS_URL = '/api/addRelationship';
	const GETFRIENDS_URL = `/api/relationships/${user.id}`;

	const [friends, setFriends] = useState([]);
	const [friend, setFriend] = useState({
		id: '',
		firstName: '',
		lastName: '',
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(ADDFRIENDS_URL, JSON.stringify({ firstName: friend.firstName, lastName: friend.lastName }), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
			if (response.data) {
				setFriends(response.data);
			}
		} catch (error) {
			toast.error('Registration Failed');
		}
	};
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user')));
	}, []);

	useEffect(() => {
		const getAllFriends = async () => {
			try {
				const response = await axios.get(GETFRIENDS_URL, JSON.stringify({ friends }), {
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				});
				if (response.data) {
					setFriends((prev) => {
						const friendsList = [...prev, friend];
						return friendsList;
					});
				}
				setFriend({
					ticker: '',
					shares: '',
				});
			} catch (error) {
				toast.error('You have no friends');
			}
		};
		getAllFriends();
	}, []);

	return (
		<>
			<CssBaseline />
			<Box sx={{ display: 'flex', mt: '40px' }}>
				<Container sx={{ width: '20%', ml: '110px' }}>
					<SideNavbar />
				</Container>
				<Container sx={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '10px' }}>
					<Typography sx={{ fontSize: '24px' }}>Hello {user.firstName}!</Typography>
					<Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<TextField
							size="small"
							placeholder="First Name"
							id="firstName"
							name="firstName"
							label="First Name"
							value={friend.firstName}
							onChange={(e) => setFriend({ ...friend, firstName: e.target.value })}
						/>
						<TextField
							size="small"
							placeholder="Last Name"
							id="lastName"
							name="lastName"
							label="Last Name"
							value={friend.lastName}
							onChange={(e) => setFriend({ ...friend, lastName: e.target.value })}
						/>
						<Button type="submit" variant="contained">
							Add a Friend
						</Button>
					</Box>
					<TableFriends friends={friends} />
				</Container>
			</Box>
		</>
	);
}

export default Friends;
