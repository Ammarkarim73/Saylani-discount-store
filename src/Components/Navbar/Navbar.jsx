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
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Person2Icon from '@mui/icons-material/Person2';
import { PlaylistAddCheckCircle, SettingsPhoneTwoTone } from '@mui/icons-material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// rect drawer mui


function Navbar(props) {
  const getLocation = window?.location?.pathname
  let [personName, setPersonName] = useState("")
  let [fileUrl, setFileUrl] = useState("")
  let pic;

  const getUserFromDataBase = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      const docSnap = await getDoc(doc(db, "Admin", "admin"));
      setPersonName(docSnap.data().username)
      setFileUrl(docSnap.data().profile)
      if (user) {

      } else {
        // User is signed out
        // ...
        navigate('/login');
      }
    });
  }
  
  
  useEffect(() => {
    getUserFromDataBase()
  })





  const data = [
    {
      name: "Home",
      icon: <HomeIcon className={getLocation === "/admin/home" ? "active" : "footer_icon"} />,
    },
    { name: "Items", icon: <ControlPointIcon className={getLocation === "/admin/add/product" ? "active" : "footer_icon"} /> },
    { name: "Profile", icon: <Person2Icon className={getLocation === "/admin/profile/setting" ? "active" : "footer_icon"} /> },
    { name: "Check Orders", icon: <PlaylistAddCheckCircle className={getLocation === "/admin/orders" ? "active" : "footer_icon"} /> },
    // { name: "Trash", icon: <ReceiptOutlined /> },
  ];

  const navigate = useNavigate()

  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItemButton key={index} onClick={() => {
          if (item.name === "Home") { navigate('/admin/home') }
          else if (item.name === "Items") { navigate('/admin/add/product') }
          else if (item.name === "Profile") { navigate('/admin/profile/setting') }
          else if (item.name === "Check Orders") { navigate('/admin/orders') }
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
          <Toolbar>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={props.backBtn === 'true' ? { display: { xl: 'block', xs: 'block' } } : { display: { xl: 'none', xs: 'none' } }}
              onClick={() => { navigate('/admin/home') }}
            >
              <ArrowBackIosNewIcon className={'navbar_icon'} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => { navigate('/admin/profile/setting') }}>
              <Avatar alt="Remy Sharp" src={fileUrl?fileUrl:Profile} />
            </Typography>
            <Typography variant="p" component="div" sx={{ flexGrow: 40 }} onClick={() => { navigate('/admin/profile/setting') }}>
              <span style={{ color: 'blue', fontWeight: 'bold' }}>{personName}</span>
              <br />
              <span style={{ color: 'greenyellow', fontWeight: 'bold' }}>Admin</span>
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

export default Navbar
