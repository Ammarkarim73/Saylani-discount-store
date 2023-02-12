import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Person2Icon from '@mui/icons-material/Person2';
import { Link } from 'react-router-dom'
function Footer() {
    const getLocation = window?.location?.pathname
    return (
        
        <div className="footer_main_div">
            <Link to='/admin/home'>
                <div className="footer_inner_div">
                    <HomeIcon className={getLocation === "/admin/home" ? "active" : "footer_icon"} />
                    <p className={getLocation === "/admin/home" ? "active" : "footer_icon"}> Home </p>
                </div>
            </Link>
            <Link to='/admin/add/product'>
                <div className="footer_inner_div">
                    <ControlPointIcon className={getLocation === "/admin/add/product" ? "active" : "footer_icon"} />
                    <p className={getLocation === "/admin/add/product" ? "active" : "footer_icon"}> Items </p>
                </div>
            </Link>
            <Link to='/admin/profile/setting'> <div className="footer_inner_div">
                <Person2Icon className={getLocation === "/admin/profile/setting" ? "active" : "footer_icon"} />
                <p className={getLocation === "/admin/profile/setting" ? "active" : "footer_icon"}> Account </p>
            </div>
            </Link>
        </div>
    )
}
export default Footer