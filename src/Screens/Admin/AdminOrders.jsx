import React from 'react'
import { Navbar } from '../../Components'
import Order from '../../Components/Order/Order'

function AdminOrders() {
  return (
    <>
      <Navbar backBtn={'true'} loc={"Check Orders"} />
      <Order />
    </>
  )
}

export default AdminOrders
