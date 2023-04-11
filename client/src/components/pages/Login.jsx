import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/api/login';

const Login = ({ login }) => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = userData;
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(LOGIN_URL, JSON.stringify({ userData }), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
			if (response.data) {
				login(response.data);
			}
			// console.log(JSON.stringify(response?.data));
			// login(userData);
		} catch (err) {
			toast.error('Incorrect login');
		}
	};

	useEffect(() => {
		if (localStorage.getItem('user')) {
			navigate('/dashboard');
		}
	});

	return (
		<>
			<Container maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography variant="h5">Login</Typography>
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={email} />
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							onChange={(e) => setUserData({ ...userData, password: e.target.value })}
							value={password}
						/>

						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default Login;
