import React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Container } from "@mui/system";
import CustomButton from "./CustomButton";
import Avatar from "@mui/material/Avatar";

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
      text: "Home",
      path: "/home",
    },
    {
      text: "Features",
      path: "/features",
    },
    {
      text: "Contact",
      path: "/contactus",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E6F0FF",
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#0F1B4C",
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

  const initials = () => {
    return user.firstName.charAt(0) + user.lastName.charAt(0);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ backgroundColor: "#E6F0FF" }}>
        <NavbarContainer>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <NavbarLinksBox>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <NavLink variant="body2">Home</NavLink>
              </Link>
              <Link to="/features" style={{ textDecoration: "none" }}>
                <NavLink variant="body2">Features</NavLink>
              </Link>
              <Link to="/contactus" style={{ textDecoration: "none" }}>
                <NavLink variant="body2">Contact</NavLink>
              </Link>
            </NavbarLinksBox>

            <Box>
              <CustomMenuIcon onClick={toggleDrawer("left", true)} />
              <Drawer
                anchor="left"
                open={mobileMenu["left"]}
                onClose={toggleDrawer("left", false)}
              >
                {list("left")}
              </Drawer>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {user.email ? (
              <>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Avatar
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => setOpen(true)}
                  >
                    {initials()}
                  </Avatar>
                  <Typography
                    onClick={(e) => setOpen(true)}
                    sx={{
                      fontSize: "14px",
                      color: "#4F5361",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {user.firstName}
                  </Typography>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    open={open}
                    onClose={(e) => setOpen(false)}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem>
                      <Link to="/profile" style={{ textDecoration: "none" }}>
                        <NavLink
                          onClick={() => navigate("/profile")}
                          variant="body2"
                        >
                          My Profile
                        </NavLink>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/" style={{ textDecoration: "none" }}>
                        <NavLink onClick={logout} variant="body2">
                          Log Out
                        </NavLink>
                      </Link>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <NavLink variant="body2">Log In</NavLink>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <CustomButton
                    backgroundColor="#0F1B4C"
                    color="#fff"
                    hoverBgColor="#E6F0FF"
                    buttonText="Register"
                  />
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
