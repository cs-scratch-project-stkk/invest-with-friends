import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, styled, Typography, Avatar, Button, CssBaseline, TextField, Grid } from '@mui/material';
import { Container } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const REGISTER_URL = '/api/signup';

function Register({ login, user }) {
	const navigate = useNavigate();
	const [success, setSuccess] = useState(false);

	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const { firstName, lastName, email, password } = userData;

	const handleSubmit = async (event) => {
		console.log(userData);
		event.preventDefault();
		try {
			const response = await axios.post(REGISTER_URL, JSON.stringify({ userData }), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
			if (response.data) {
				console.log(response.data);
				setSuccess(true);
				login(response.data);
			}
		} catch (error) {
			toast.error('Registration Failed');
		}
	};

	useEffect(() => {
		if (success) {
			navigate('/dashboard');
		}
	});

	return (
		<Container maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">Sign up</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField required fullWidth id="firstName" name="firstName" label="First Name" value={firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField required fullWidth id="lastName" name="lastName" label="Last Name" value={lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
						</Grid>
						<Grid item xs={12}>
							<TextField required fullWidth id="email" name="email" label="Email Address" value={email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
						</Grid>
						<Grid item xs={12}>
							<TextField required fullWidth id="password" name="password" type="password" label="Password" value={password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
					<Grid container sx={{ justifyContent: 'flex-end' }}>
						<Grid item>
							<Link to="/login" variant="body2">
								Already have an account? Log in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default Register;
