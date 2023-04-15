import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, styled, Typography, Stack, CssBaseline, InputBase, TextField, Button, Grid } from '@mui/material';
import { Container } from '@mui/system';
import axios from '../api/axios';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CustomPieChart from './CustomPieChart';
import FriendPieChart from './FriendPieChart';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function TableFriends({ friends }) {
	const BootstrapDialog = styled(Dialog)(({ theme }) => ({
		'& .MuiDialogContent-root': {
			padding: theme.spacing(2),
		},
		'& .MuiDialogActions-root': {
			padding: theme.spacing(1),
		},
	}));

	function BootstrapDialogTitle(props) {
		const { children, onClose, ...other } = props;

		return (
			<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
				{children}
				{onClose ? (
					<IconButton
						aria-label="close"
						onClick={onClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}>
						<CloseIcon />
					</IconButton>
				) : null}
			</DialogTitle>
		);
	}

	BootstrapDialogTitle.propTypes = {
		children: PropTypes.node,
		onClose: PropTypes.func.isRequired,
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	// const first_name = friends.map((friend) => friend.first_name);
	// console.log(first_name);

	return (
		<>
			<Table size="small" sx={{ width: '55%', mt: '25px' }}>
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>Portfolio</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{friends.map((friend, index) => (
						<TableRow key={index}>
							<TableCell>{friend.first_name}</TableCell>
							<TableCell>{friend.last_name}</TableCell>
							<TableCell>
								<Popup trigger={<Button>View</Button>} position="right center">
									<FriendPieChart friendID={friend.user_id} />
								</Popup>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}

export default TableFriends;

{
	/* <TableCell>
<Button onClick={handleClickOpen}>View</Button>
<BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
	<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
		{friend.first_name}
	</BootstrapDialogTitle>
	<DialogContent dividers>
		<Typography gutterBottom>
			<div>{JSON.stringify(friend.user_id)}</div>
			<FriendPieChart friendID={friend.user_id} />
		</Typography>
	</DialogContent>
	<DialogActions>
		<Button autoFocus onClick={handleClose}>
			OK
		</Button>
	</DialogActions>
</BootstrapDialog>
</TableCell> */
}

{
	/* <TableCell>
          <Button variant="outlined" onClick={handleClickOpen}>
          View
          </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          `${friend.first_name}'s Portfolio`
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            PIE CHART 
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </TableCell> */
}
