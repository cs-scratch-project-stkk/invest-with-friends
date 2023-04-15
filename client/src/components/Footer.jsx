import React from 'react';
import { Box, Container } from '@mui/system';
import { Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
	const CustomContainer = styled(Container)(({ theme }) => ({
		display: 'flex',
		textAlign: 'center',
		flexDirection: 'column',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			alignItems: 'center',
			textAlign: 'center',
		},
	}));

	const FooterLinksBox = styled(Box)(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		gap: theme.spacing(0.75),
	}));

	const FooterLink = styled(Typography)(({ theme }) => ({
		fontSize: '14px',
		color: '#4F5361',
		cursor: 'pointer',
		'&:hover': {
			color: '#0F1B4C',
		},
	}));

	const IconBox = styled(Box)(({ theme }) => ({
		display: 'flex',
		gap: '1rem',
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(1),
		cursor: 'pointer',
		color: '#4F5361',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		},
	}));

	const FooterBox = styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: theme.spacing(1.25),
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			alignItems: 'center',
			textAlign: 'center',
		},
	}));

	return (
		<>
			<Box sx={{ paddingTop: 4, paddingBottom: 2 }}>
				<CustomContainer>
					<FooterLinksBox>
						<Typography sx={{ fontWeight: '700', paddingBottom: '0.25rem' }}>About Us</Typography>
						<Link to="/login" style={{ textDecoration: 'none' }}>
							<FooterLink variant="body2">Login</FooterLink>
						</Link>
						<Link to="/register" style={{ textDecoration: 'none' }}>
							<FooterLink variant="body2">Subscribe</FooterLink>
						</Link>
						<Link to="/features" style={{ textDecoration: 'none' }}>
							<FooterLink variant="body2">How It Works</FooterLink>
						</Link>
						<Link to="/contactus" style={{ textDecoration: 'none' }}>
							<FooterLink variant="body2">Blog</FooterLink>
						</Link>
					</FooterLinksBox>
					<FooterBox>
						<IconBox>
							<FacebookIcon
								onClick={() => window.open('https://www.facebook.com/')}
								sx={{
									'&:hover': {
										color: '#0F1B4C',
									},
								}}
							/>

							<InstagramIcon
								onClick={() => window.open('https://www.instagram.com/')}
								sx={{
									'&:hover': {
										color: '#0F1B4C',
									},
								}}
							/>
							<TwitterIcon
								onClick={() => window.open('https://www.twitter.com/')}
								sx={{
									'&:hover': {
										color: '#0F1B4C',
									},
								}}
							/>
						</IconBox>
						<Box>
							<Typography sx={{ color: '#4F5361', fontSize: '14px' }}>IWF © 2023</Typography>
						</Box>
					</FooterBox>
				</CustomContainer>
			</Box>
		</>
	);
}

export default Footer;
