import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie';
import getUserInfo from '../../api/getUserInfo'


const Header = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const settings = ["Logout"];
    const [cookies, setCookie] = useCookies();

    useEffect(()=>{
        getUserInfo(cookies.token)
            .then(alunno => {
                setNome(alunno.desNome);
                setCognome(alunno.desCognome);
            })
    })

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        setCookie("token", "", { path: "/" });
        window.location.href = "/login";
    }

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h5"
                        component="div" sx={{ flexGrow: 1 }}>
                        REGISTRO ELETTRONICO
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6"
                            component="div" sx={{ flexGrow: 1 }}>
                            {`${nome} ${cognome}`}
                        </Typography>
                    </Box>
                    <Tooltip title="Account" sx={{ml: '20px'}}>
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
        </AppBar>
    );
};
export default Header;