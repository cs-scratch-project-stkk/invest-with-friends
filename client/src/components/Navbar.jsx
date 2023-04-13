import React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, styled, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
import CustomButton from './CustomButton';
import SearchIcon from '@mui/icons-material/Search';

function Navbar({ user, logout }) {
	const [mobileMenu, setMobileMenu] = useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => () => {
		setMobileMenu({ [anchor]: open });
		// console.log(mobileMenu)
	};
	const navigate = useNavigate();

	const menuList = [
		{
			text: 'Home',
			path: '/home',
		},
		{
			text: 'Features',
			path: '/features',
		},
		{
			text: 'Contact',
			path: '/contactus',
		},
	];

	const list = (anchor) => (
		<List sx={{ width: 250 }} onClick={toggleDrawer(anchor, false)}>
			{menuList.map((item) => (
				<ListItem key={item.text} onClick={() => navigate(item.path)}>
					<ListItemButton>
						<ListItemText primary={item.text} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);

	const NavbarContainer = styled(Container)(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#E6F0FF',
		padding: theme.spacing(2),
		[theme.breakpoints.down('md')]: {
			padding: theme.spacing(2),
		},
	}));

	const NavbarLinksBox = styled(Box)(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: theme.spacing(4),
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	}));

	const NavLink = styled(Typography)(({ theme }) => ({
		fontSize: '14px',
		color: '#4F5361',
		fontWeight: 'bold',
		cursor: 'pointer',
		'&:hover': {
			color: '#0F1B4C',
		},
	}));

	const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
		cursor: 'pointer',
		display: 'none',
		marginRight: theme.spacing(2),
		[theme.breakpoints.down('md')]: {
			display: 'block',
		},
	}));

	return (
		<>
			<Box sx={{ backgroundColor: '#E6F0FF' }}>
				<NavbarContainer>
					<Box
						sx={{
							display: 'flex',
						}}>
						<NavbarLinksBox>
							<Link to="/home" style={{ textDecoration: 'none' }}>
								<NavLink variant="body2">Home</NavLink>
							</Link>
							<Link to="/features" style={{ textDecoration: 'none' }}>
								<NavLink variant="body2">Features</NavLink>
							</Link>
							<Link to="/contactus" style={{ textDecoration: 'none' }}>
								<NavLink variant="body2">Contact</NavLink>
							</Link>
						</NavbarLinksBox>

						<Box>
							<CustomMenuIcon onClick={toggleDrawer('left', true)} />
							<Drawer anchor="left" open={mobileMenu['left']} onClose={toggleDrawer('left', false)}>
								{list('left')}
							</Drawer>
						</Box>
					</Box>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '1.5rem',
						}}>
						{user.email.length > 0 ? (
							<>
								<Link to="/" style={{ textDecoration: 'none' }}>
									<NavLink onClick={logout} variant="body2">
										Log Out
									</NavLink>
								</Link>
							</>
						) : (
							<>
								<Link to="/login" style={{ textDecoration: 'none' }}>
									<NavLink variant="body2">Log In</NavLink>
								</Link>
								<Link to="/register" style={{ textDecoration: 'none' }}>
									<CustomButton backgroundColor="#0F1B4C" color="#fff" hoverBgColor="#E6F0FF" buttonText="Register" />
								</Link>
							</>
						)}
					</Box>
				</NavbarContainer>
			</Box>
		</>
	);
}

export default Navbar;
