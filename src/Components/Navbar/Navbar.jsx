import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Avatar from '@mui/material/Avatar';
import Profile from '../../Assets/Images/Profile.png'

export default function Navbar() {
    return (
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
                        <ArrowBackIosNewIcon className='navbar_icon' />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Avatar alt="Remy Sharp" src={Profile} />
                    </Typography>
                    <Typography variant="p" component="div" sx={{ flexGrow: 40 }}>
                        <span style={{color:'blue',fontWeight:'bold'}}>Ammar Karim</span>
                        <br />
                        <span style={{color:'greenyellow',fontWeight:'bold'}}>Admin</span>
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon className='navbar_icon' />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
