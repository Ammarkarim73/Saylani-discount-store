import React from 'react';
import {
    HOME,
    SIGN_UP,
    SIGN_IN,
    USERHOME,
    ADMINHOME,
    ADMINORDERS,
    ADMINPROFILE,
    ADMINPRODUCTS,
    FRUITS,
    GROCERY,
    MEAT,
    VEGETABLES,

} from './path'

import {
    Home, SignUp, Login, UserHome,
    AdminHome, AdminOrders, AdminProfile,
    AdminAddProducts
} from '../Screens/index'
import Fruits from '../Screens/Items/Fruits';
import Grocery from "../Screens/Items/Grocery"
import Meat from "../Screens/Items/Meat"
import Vegetables from "../Screens/Items/Vegetables"
import { Routes, Route } from 'react-router-dom'

const Router = () => {
    return (
        <Routes>
            <Route path={HOME} element={<Home />}></Route>
            <Route path={SIGN_UP} element={<SignUp />}></Route>
            <Route path={SIGN_IN} element={<Login />}></Route>
            <Route path={USERHOME} element={<UserHome />}></Route>
            <Route path={ADMINHOME} element={<AdminHome />}></Route>
            <Route path={ADMINORDERS} element={<AdminOrders />}></Route>
            <Route path={ADMINPROFILE} element={<AdminProfile />}></Route>
            <Route path={ADMINPRODUCTS} element={<AdminAddProducts />}></Route>
            <Route path={FRUITS} element={<Fruits />}></Route>
            <Route path={GROCERY} element={<Grocery />}></Route>
            <Route path={MEAT} element={<Meat />}></Route>
            <Route path={VEGETABLES} element={<Vegetables />}></Route>
        </Routes>
    )
}
export default Router