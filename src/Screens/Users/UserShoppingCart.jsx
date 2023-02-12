import React, { useState } from "react";
import { PlusCircleOutlined, MinusCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'
import { UserFooter } from "../../Components";
import profile from '../../Assets/Images/Profile.png'
import DeleteIcon from '@mui/icons-material/Delete';
import meat from '../../Assets/Images/meat.jpeg'

function UserShoppingCart() {
  const [count, setCount] = useState(0)
  const [clr, setClr] = useState("white")
  function add() {
    setCount(count + 1)
    setClr("white")
  }
  function sub() {
    setCount(count - 1)

  }
  function res() {
    setCount(count - count)
  }
  return (
    <>

      <img className="shopping_proifle" src={profile} alt="" />
      <div className="shpping_div">
        <div className="shopping_cart_div">
          <div className="shopping_cart_heading">
            <h1>Shopping</h1>
            <p>Cart</p>
          </div>
          <div className="shopping_icon"><DeleteIcon /></div>
        </div>
        <div className="shooping_cart_images_main_div">
          <div className="shopping_image">
            <img src={meat} alt="" />
            <h3>item image</h3>
            <div className="counter_main">

              <button className='counter_button' onClick={add}><PlusCircleOutlined /></button>
              <span type="text" ><p className='number' style={{ color: clr }}>{count}</p></span>
              <button className='counter_button' onClick={sub}><MinusCircleOutlined /></button>

            </div>

          </div>
          <div className="ammount">$23.00</div>

        </div>

        <div className="shooping_cart_images_main_div">
          <div className="shopping_image">
            <img src={meat} alt="" />
            <h3>item image</h3>
            <div className="counter_main">

              <button className='counter_button' onClick={add}><PlusCircleOutlined /></button>
              <span type="text" ><p className='number' style={{ color: clr }}>{count}</p></span>
              <button className='counter_button' onClick={sub}><MinusCircleOutlined /></button>

            </div>

          </div>
          <div className="ammount">$23.00</div>

        </div>
        <div className="shooping_cart_images_main_div">
          <div className="shopping_image">
            <img src={meat} alt="" />
            <h3>item image</h3>
            <div className="counter_main">

              <button className='counter_button' onClick={add}><PlusCircleOutlined /></button>
              <span type="text" ><p className='number' style={{ color: clr }}>{count}</p></span>
              <button className='counter_button' onClick={sub}><MinusCircleOutlined /></button>

            </div>

          </div>
          <div className="ammount">$23.00</div>



        </div>
        <div className="total">
          <div className="total_heading">Total</div>
          <div className="total_amount">$ 185.500</div>
        </div>

        <input type="password" className="input shop_input" placeholder='Enter Full Name'/>
        <input type="password" className="input shop_input" placeholder='Enter Email'/>
        <input type="password" className="input shop_input" placeholder='Enter Phone Number'/>
        <textarea type="password" className="input shop_input" placeholder='Enter shipping address'></textarea>

        <div className="order_button_div">
          <button className='order_button'> <Link to=''className='link'  > Place Order</Link> </button>
        </div>

      </div>
      <UserFooter />





    </>
  )
}

export default UserShoppingCart
