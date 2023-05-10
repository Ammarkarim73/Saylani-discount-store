import React, { useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom';
import MyAlert from '../Alert';


// rect drawer mui

import { ListItemIcon, Drawer, ListItemText, ListItemButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { PlaylistAddCheckCircle, SettingsPhoneTwoTone } from '@mui/icons-material';

// rect drawer mui


function CategoryBar(props) {
  const getLocation = window?.location?.pathname


  const data = [
    {
      name: "All Categories",
      icon: <HomeIcon className={"footer_icon"} />,
    },
    { name: "Fruits", icon: <PlaylistAddCheckCircle className={getLocation === "/category/fruits" ? "active" : "footer_icon"} /> },
    { name: "Vegetables", icon: <PlaylistAddCheckCircle className={getLocation === "/category/vegetables" ? "active" : "footer_icon"} /> },
    { name: "Meat", icon: <PlaylistAddCheckCircle className={getLocation === "/category/meat" ? "active" : "footer_icon"} /> },
    { name: "Grocery Items", icon: <PlaylistAddCheckCircle className={getLocation === "/category/grocery" ? "active" : "footer_icon"} /> },
    // { name: "Trash", icon: <ReceiptOutlined /> },
  ];

  const navigate = useNavigate()

  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItemButton key={index} onClick={() => {
          if (item.name === "All Categories") { navigate('/admin/home') }
          else if (item.name === "Fruits") { navigate('/category/fruits') }
          else if (item.name === "Vegetables") { navigate('/category/vegetables') }
          else if (item.name === "Meat") { navigate('/category/meat') }
          else if (item.name === "Grocery Items") { navigate('/category/grocery') }
        }}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} className={item.name === props.loc ? "active" : ""} />
        </ListItemButton>
      ))}
    </div>
  );



  return (
    <>
      {props.alert === true ? <MyAlert alert={true} alertMsg={props.alertMsg} /> : null}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{textAlign: "center" }} >

            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={props.backBtn === 'true' ? { display: { xl: 'block', xs: 'block' } } : { display: { xl: 'none', xs: 'none' } }}
              onClick={() => { navigate('/admin/home') }}
            >
              <ArrowBackIosNewIcon className={'navbar_icon'} />
            </IconButton>
            <Typography variant="p" component="div" sx={{ flexGrow: 40, textAlign: "center"}} >
              <span style={{ color: 'blue', fontWeight: 'bold', fontSize: "24px", textAlign: "center" }}>CATEGORIES</span>
            </Typography>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon className='navbar_icon' />
            </IconButton>
            <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
              {getList()}
            </Drawer>
          </Toolbar>
        </AppBar>
        <div>
        </div>
      </Box>
    </>
  );
}

export default CategoryBar