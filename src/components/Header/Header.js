import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { useCookies } from 'react-cookie';
import apiRequest from '../../api/apiRequest';
import { Container, Tooltip, Avatar, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useMediaQuery from "@mui/material/useMediaQuery";


const Header = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const settings = ["Logout"];
    const [cookies, setCookie] = useCookies();

    const matches = useMediaQuery("(min-width:930px)");

    let box = <></>
    let drawerWidth = 300;
    if (!matches) {
        drawerWidth = 60;
    }
    else {
        box = <Typography variant="h5"
            component="div" noWrap sx={{ flexGrow: 1 }}>
            Registro Elettronico
        </Typography>
    }

    useEffect(() => {
        const scheda = JSON.parse(window.localStorage.getItem("schede"))
        setNome(scheda.alunno.desNome)
        setCognome(scheda.alunno.desCognome)
    })

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        setCookie("session", "", { path: "/" });
        window.location.href = "/login";
    }

    return (
        <AppBar position="fixed">
            <Toolbar
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Container maxWidth="100%" sx={{ margin: 0, width: "100%" }}>
                    <Toolbar disableGutters>
                        {box}

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6"
                                component="div" sx={{ flexGrow: 1 }}>
                                {`${nome} ${cognome}`}
                            </Typography>
                        </Box>

                        <Tooltip title="Account" sx={{ ml: '20px' }}>
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar alt="Mario Rossi">
                                    <AccountCircleIcon />
                                </Avatar>
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={handleLogout}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Toolbar>
                </Container>
            </Toolbar>
        </AppBar >
    );
};
export default Header;