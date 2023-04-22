import React from 'react'
import { Footer } from '../../Components'
import Navbar from '../../Components/Navbar/Navbar'
import fruits from '../../Assets/Images/fruits.jpg'
import vegetable from '../../Assets/Images/vegetable.png'
import grocery from '../../Assets/Images/shop_grocery.jpeg'
import meat from '../../Assets/Images/meat.jpeg'
import { useNavigate } from 'react-router-dom'
function AdminHome() {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar backBtn={'false'} loc={"Home"} />
      <div className='admin_home_div'>
        <h3>All Categories</h3>

        <div className='card_main_div' onClick={()=>{
          navigate("/category/fruits")
        }}>
          <div className='product_card_div'>
            <img className='card_img' src={fruits} />
            <div className='product_main_div'>
              <p className='product_name'>Fruits</p>
            </div>
          </div>
        </div>

        <div className='card_main_div' onClick={()=>{
          navigate("/category/vegetables")
        }}>
          <div className='product_card_div'>
            <img className='card_img' src={vegetable} />
            <div className='product_main_div'>
              <p className='product_name'>Vegetables</p>
            </div>
          </div>
        </div>

        <div className='card_main_div' onClick={()=>{
          navigate("/category/meat")
        }}>
          <div className='product_card_div'>
            <img className='card_img' src={meat} />
            <div className='product_main_div'>
              <p className='product_name'>Meat</p>
            </div>
          </div>
        </div>

        <div className='card_main_div' onClick={()=>{
          navigate("/category/grocery")
        }}>
          <div className='product_card_div'>
            <img className='card_img' src={grocery} />
            <div className='product_main_div'>
              <p className='product_name'>Grocery Items</p>
            </div>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default AdminHome
