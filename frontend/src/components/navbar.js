import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import Alert from "./Alert";

//styles
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const Navbar = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const renderGuestLinks = (
        <div>
            <MenuItem onClick={handleClose}>
                <NavLink to="/login">Login</NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <NavLink to="/signup">Signup</NavLink>
            </MenuItem>
        </div>
    );
    const renderAuthLinks = (
        <div>
            <MenuItem onClick={handleClose}>
                <NavLink to="/">Profile</NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <NavLink to="/my-house">My House</NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <a onClick={() => handleLogout()}>Logout</a>
            </MenuItem>
        </div>
    );
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            HouseMates
                        </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {isAuthenticated
                                    ? renderAuthLinks
                                    : renderGuestLinks}
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <Alert />
        </div>
    );
};
export default Navbar;
