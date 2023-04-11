import React, { useState, useEffect } from 'react';
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
import FriendsList from '../FriendsList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const FRIENDS_URL = '/api/friends';

function Friends({ user, setUser }) {
	const [friends, setFriends] = useState([]);
	const [friend, setFriend] = useState({
		firstName: '',
		lastName: '',
	});

	// const Search = styled('div')(({ theme }) => ({
	// 	backgroundColor: '#F2F2F2',
	// 	padding: '0 10px',
	// 	borderRadius: theme.shape.borderRadius,
	// 	width: '20%',
	// }));

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(FRIENDS_URL, JSON.stringify({ firstName: friend.firstName, lastName: friend.lastName }), {
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
		const getAllFriends = async (friends) => {
			try {
				const response = await axios.get(FRIENDS_URL, JSON.stringify({ friends }), {
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
				toast.error('The user was not found.');
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

					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>First Name</TableCell>
								<TableCell>Last Name</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{friends.map((friend, index) => (
								<TableRow key={index}>
									<TableCell>{friends.firstName}</TableCell>
									<TableCell>{friends.lastName}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Container>
			</Box>
		</>
	);
}

export default Friends;
