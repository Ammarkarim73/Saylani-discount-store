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
    
} from './path'

import {Home,SignUp,Login, UserHome, AdminHome, AdminOrders, AdminProfile, AdminAddProducts} from '../Screens/index'
import { Routes, Route } from 'react-router-dom'

const Router = () => {
    return (
        <Routes>
            <Route path={HOME} element={<Home/>}></Route>
            <Route path={SIGN_UP} element={<SignUp/>}></Route>
            <Route path={SIGN_IN} element={<Login/>}></Route>
            <Route path={USERHOME} element={<UserHome/>}></Route>
            <Route path={ADMINHOME} element={<AdminHome/>}></Route>
            <Route path={ADMINORDERS} element={<AdminOrders/>}></Route>
            <Route path={ADMINPROFILE} element={<AdminProfile/>}></Route>
            <Route path={ADMINPRODUCTS} element={<AdminAddProducts/>}></Route>
        </Routes>
    )
}
export default Router