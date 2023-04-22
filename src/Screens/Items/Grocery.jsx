import React from 'react'
import { Footer } from '../../Components'
import Navbar from '../../Components/Navbar/Navbar'
import fruit_img from '../../Assets/Images/fruits.jpg'
import vegetable_img from '../../Assets/Images/vegetable.png'
import grocery_img from '../../Assets/Images/shop_grocery.jpeg'
import meat_img from '../../Assets/Images/meat.jpeg'
import CategoryBar from '../../Components/CategoryBar/CategoryBar'

export default function Grocery() {
  return (
    <div>
    <CategoryBar backBtn={'true'} loc={"Grocery Items"} />
    <div className='admin_home_div'>
      <h3>Grocery Items</h3>

      <div className='card_main_div'>
        <div className='product_card_div'>
          <img className='card_img' src={fruit_img} />
          <div className='product_main_div'>
            <p className='product_name'>Fruits</p>
          </div>
        </div>
      </div>

      <div className='card_main_div'>
        <div className='product_card_div'>
          <img className='card_img' src={vegetable_img} />
          <div className='product_main_div'>
            <p className='product_name'>Vegetables</p>
          </div>
        </div>
      </div>

      <div className='card_main_div'>
        <div className='product_card_div'>
          <img className='card_img' src={meat_img} />
          <div className='product_main_div'>
            <p className='product_name'>Meat</p>
          </div>
        </div>
      </div>

      <div className='card_main_div'>
        <div className='product_card_div'>
          <img className='card_img' src={grocery_img} />
          <div className='product_main_div'>
            <p className='product_name'>Groceries Items</p>
          </div>
        </div>
      </div>

    </div>
    <Footer/>
  </div>
  )
}
