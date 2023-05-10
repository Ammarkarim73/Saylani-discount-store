import React, { useEffect, useState } from "react";
import { PlusCircleOutlined, MinusCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom'
import { UserFooter } from "../../Components";
import profile from '../../Assets/Images/Profile.png'
import DeleteIcon from '@mui/icons-material/Delete';
import meat from '../../Assets/Images/meat.jpeg'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

function UserShoppingCart() {
  const navigate = useNavigate('')

  const [fileUrl, setFileUrl] = useState('');
  // const [classActive, setClassActive] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  // const [uid, setuid] = useState('')

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

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // setuid(user.uid)
        const docSnap = await getDoc(doc(db, "Users", user.uid));
        setFileUrl(docSnap.data().profile)
        setName(docSnap.data().username)
        setNumber(docSnap.data().number)
      } else {
        // User is signed out
        // ...
        navigate('/login');
      }
    });
  }, [""])

  return (
    <>

      <img className="shopping_proifle" src={fileUrl? fileUrl:profile} alt="" />
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
