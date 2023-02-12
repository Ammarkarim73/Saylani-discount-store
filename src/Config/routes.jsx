import React from 'react';
import {
    HOME,
    SIGN_UP,
    SIGN_IN,
    ADMIN_ADD_PRODUCT,
    ADMIN_PROFILE_SETTING,
    ADMIN_ORDERS,
    ADMIN_HOME,
    USER_HOME_PAGE,
    USER_PROFILE,
    USER_SHOPPING_CART
} from './path'
import {
    Home,
    SignUp,
    Login,
    UserHome,
    UserProfile,
    UserShoppingCart,
    AdminHome,
    AdminOrders,
    AdminProfile,
    AdminAddProducts
} from '../Screens/index'
import { Routes, Route } from 'react-router-dom'

const Router = () => {
    let getLocation = window?.location?.pathname
    return (
            <Routes>
                <Route path={HOME} element={<Home />}></Route>
                <Route path={SIGN_UP} element={<SignUp />}></Route>
                <Route path={SIGN_IN} element={<Login />}></Route>
                <Route path={USER_HOME_PAGE} element={<UserHome />}></Route>
                <Route path={USER_PROFILE} element={<UserProfile />}></Route>
                <Route path={USER_SHOPPING_CART} element={<UserShoppingCart />}></Route>
                <Route path={ADMIN_HOME} element={<AdminHome />}></Route>
                <Route path={ADMIN_ORDERS} element={<AdminOrders />}></Route>
                <Route path={ADMIN_PROFILE_SETTING} element={<AdminProfile />}></Route>
                <Route path={ADMIN_ADD_PRODUCT} element={<AdminAddProducts />}></Route>
            </Routes>
    )
}
export default Router