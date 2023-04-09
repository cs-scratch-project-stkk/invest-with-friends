import React from 'react';
import Navbar from './Navbar';
import { Box, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import CustomButton from './CustomButton';

function HeroSection() {
	const CustomBox = styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: theme.spacing(5),
		marginTop: theme.spacing(3),
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			alignItems: 'center',
			textAlign: 'center',
		},
	}));

	const Title = styled(Typography)(({ theme }) => ({
		fontSize: '64px',
		color: '#000336',
		fontWeight: 'bold',
		margin: theme.spacing(4, 0, 4, 0),
		[theme.breakpoints.down('sm')]: {
			fontSize: '40px',
		},
	}));

	// const CustomContainer = styled(Box)(({ theme }) => ({
	// 	[theme.breakpoints.down('md')]: {
	// 		flexDirection: 'column',
	// 		alignItems: 'center',
	// 		textAlign: 'center',
	// 	},
	// }));

	return (
		<>
			<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
				<Container>
					<CustomBox>
						<Box sx={{ flex: '1' }}>
							<Typography
								variant="body2"
								sx={{
									fontSize: '18px',
									color: '#687690',
									fontWeight: 'bold',
									mt: 10,
									mb: 4,
								}}>
								Welcome to Invest with Friends
							</Typography>
							<Title variant="h1">Find out how your friends are investing.</Title>
							<Typography variant="body2" sx={{ fontSize: '18px', color: '#5A6473', my: 4 }}>
								Learn from your friends to become more financially educated.
							</Typography>
							<CustomButton backgroundColor="#0F1B4C" color="#fff" buttonText="More About Us" heroBtn={true} hoverBgColor="#E6F0FF" />
						</Box>
						<Box sx={{ flex: '1.25' }}>
							<img src="/images/hero-image-2.png" alt="heroImg" style={{ maxWidth: '100%' }} />
						</Box>
					</CustomBox>
				</Container>
			</Box>
		</>
	);

	// <img src="/images/hero-image-2.png" />;
}

export default HeroSection;
