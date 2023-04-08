import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Container } from "@mui/system";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(2)
	}));

	const NavLink = styled(Typography)(({ theme }) => ({
		fontSize: "14px",
    color: "#4F5361",
    fontWeight: "regular",
    cursor: "pointer",
    "&:hover": {
      color: "#0F1B4C",
		}
	}));

	const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

	const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

	return (
		<>
		<Box sx={{backgroundColor: '#E6F0FF', pt: 20, pb: 10 }}>
		  <CustomContainer>
			  <NavbarLinksBox>
			    <NavLink sx={{fontWeight: "bold", fontSize: "16px"}}>Features</NavLink>
			    <NavLink>Portfolio</NavLink>
			    <NavLink>Mobile app</NavLink>
					<NavLink>Friends</NavLink>
			    <NavLink>How It Works</NavLink>
			    <NavLink>Blog</NavLink>
		    </NavbarLinksBox>
				<NavbarLinksBox>
				  <NavLink sx={{fontWeight: "bold", fontSize: "16px"}}>Company</NavLink>
				  <NavLink>About</NavLink>
				  <NavLink>Contact</NavLink>
				  <NavLink>Careers</NavLink>
			  </NavbarLinksBox>
				<NavbarLinksBox>
				  <NavLink sx={{fontWeight: "bold", fontSize: "16px"}}>Commmunity</NavLink>
				  <NavLink>Discord</NavLink>
				  <NavLink>Twitter</NavLink>
				  <NavLink>Blog</NavLink>
					<NavLink>LinkedIn</NavLink>
			</NavbarLinksBox>
			<IconBox>
        <FacebookIcon sx={{color: "#0F1B4C"}}/>
				<InstagramIcon sx={{color: "#0F1B4C"}}/>
				<TwitterIcon sx={{color: "#0F1B4C"}}/>
      </IconBox>
			</CustomContainer>
		</Box>
		</>
	)
}

export default Footer;
