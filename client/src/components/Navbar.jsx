import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import CustomButton from "./CustomButton";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Box, Drawer, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";


export const Navbar = () => {

  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const navigate = useNavigate();
 
  const toggleDrawer = (anchor, open) => (event) => {
   
    setMobileMenu({ [anchor]: open });
  };

  const menuItems = [
    {
      text: 'Home',
      path: '/'
    },
    {
      text: 'Features',
      path: '/features'
    },
    { text: 'Contact',
      path: '/contactus'
    }
  ]

         

  const list = (anchor) => (
    <List sx={{width: 250}} onClick={toggleDrawer(anchor, false)}> 
    {menuItems.map(item => (
      <ListItemButton
        key={item.text} onClick={() => navigate(item.path)}
      >
      <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
    </List>
  );

  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#fff",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));


  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));



  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <Box sx={{backgroundColor: '#E6F0FF'}}>
      <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon onClick={toggleDrawer("left", true)} />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        
        </Box>

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
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <NavLink variant="body2" onClick={ ()=> navigate('/login') }>Log In</NavLink>
        <CustomButton
          backgroundColor="#0F1B4C"
          color="#fff"
          buttonText="Register"
        />
      
      </Box>
      </NavbarContainer>
    </Box>
  );
};

export default Navbar;