import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'

function UserFooter() {
    const getLocation = window?.location?.pathname
    return (
        <div className="footer_main_div">
            <Link to='/user/home/page' className="link">
                <div className="footer_inner_div">
                    <HomeIcon className={getLocation === "/user/home/page" ? "active" : "footer_icon"} />
                    <p className={getLocation === "/user/home/page" ? "active" : "footer_icon"}> Home </p>
                </div>
            </Link>
            <Link to='/user/shopping/cart' className="link" >
                <div className="footer_inner_div">
                    <ShoppingCartIcon  className={getLocation === "/user/shopping/cart" ? "active" : "footer_icon"}/>
                    <p className={getLocation === "/user/shopping/cart" ? "active" : "footer_icon"}>Cart </p>
                </div>
            </Link>
            <Link to='/user/profile' className="link">
                <div className="footer_inner_div">
                    <Person2Icon  className={getLocation === "/user/profile" ? "active" : "footer_icon"}/>
                    <p  className={getLocation === "/user/profile" ? "active" : "footer_icon"}> Account </p>
                </div>
            </Link>
        </div>
    )
}
export default UserFooter

