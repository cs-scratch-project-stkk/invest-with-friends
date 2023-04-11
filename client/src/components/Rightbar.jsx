import React from 'react';
import { Box, styled, Typography, Stack, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';

function Rightbar() {
	return (
		<Box backgroundColor="#F2F2F2" flex={2} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
			Rightbar
		</Box>
	);
}

export default Rightbar;
