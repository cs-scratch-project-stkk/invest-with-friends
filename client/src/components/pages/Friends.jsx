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
		user_id: '',
		first_name: '',
		last_name: '',
	});

	const userData = JSON.parse(localStorage.getItem('user'));
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user')));
	}, []);

	useEffect(() => {
		setFriend({ ...friend, user_id: userData.id });
	}, [friend.first_name]);

	useEffect(() => {
		const getAllFriends = async () => {
			try {
				const response = await axios.get(GETFRIENDS_URL);
				if (response.data) {
					setFriends(response.data);
				}
			} catch (error) {
				toast.error('Server did not retrieve data appropriately.');
			}
		};
		getAllFriends();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const existingFriends = friends.find((data) => data.last_name === friend.last_name);
			if (!existingFriends) {
				const response = await axios.post(ADDFRIENDS_URL, JSON.stringify(friend), {
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				});
				if (response.data) {
					setFriends(response.data);
					localStorage.setItem('friends', JSON.stringify(response.data));
				}
			} else {
				toast.error('You guys are already friends.');
			}

			setFriend({
				user_id: '',
				first_name: '',
				last_name: '',
			});
		} catch (error) {
			toast.error('Friend does not exist in the database. ');
		}
	};

	// useEffect(() => {
	// 	const getAllFriends = async () => {
	// 		try {
	// 			const response = await axios.get(GETFRIENDS_URL);
	// 			if (response.data) {
	// 				setFriends((prev) => {
	// 					const friendsList = [...prev, friend];
	// 					return friendsList;
	// 				});
	// 			}
	// 			setFriend({
	// 				ticker: '',
	// 				stock_quantity: '',
	// 			});
	// 		} catch (error) {
	// 			toast.error('You have no friends');
	// 		}
	// 	};
	// 	getAllFriends();
	// }, []);

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
							id="first_name"
							name="first_name"
							label="First Name"
							value={friend.first_name}
							onChange={(e) => setFriend({ ...friend, first_name: e.target.value })}
						/>
						<TextField
							size="small"
							placeholder="Last Name"
							id="last_name"
							name="last_name"
							label="Last Name"
							value={friend.last_name}
							onChange={(e) => setFriend({ ...friend, last_name: e.target.value })}
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
