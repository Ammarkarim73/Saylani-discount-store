import React from 'react'
import { Footer } from '../../Components'
import Navbar from '../../Components/Navbar/Navbar'
import apple_img from '../../Assets/Images/apple.png'
function AdminHome() {
  return (
    <div>
      <Navbar />
      <div className='admin_home_div'>
        <h3>All Products</h3>

        <div className='card_main_div'>
          <div className='product_card_div'>
            <img className='card_img' src={apple_img} />
            <div className='product_main_div'>
              <p className='product_name'>Apple</p>
              <p className='product_rate' >1. kg</p>
            </div>
          </div>
          <p className='product_cost'>$2.1</p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AdminHome
