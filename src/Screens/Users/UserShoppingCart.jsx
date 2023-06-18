import React, { useEffect, useState } from "react";
import { PlusCircleOutlined, MinusCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom'
import { UserFooter } from "../../Components";
import profile from '../../Assets/Images/Profile.png'
import DeleteIcon from '@mui/icons-material/Delete';
import meat from '../../Assets/Images/meat.jpeg'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import itemImg from '../../Assets/Images/item.png'

function UserShoppingCart() {
  const navigate = useNavigate('')

  const [fileUrl, setFileUrl] = useState('');
  // const [classActive, setClassActive] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  // const [uid, setuid] = useState('')

  // const [price, setPrice] = useState(0)
  let price= []

const add = (e) => {
  let value = +e.target.nextElementSibling.firstElementChild.innerText + 1;
  e.target.nextElementSibling.firstElementChild.innerHTML = value;

  e.target.nextElementSibling.firstElementChild.innerText <= '1' ?
  e.target.nextElementSibling.nextElementSibling.disabled = true :
  e.target.nextElementSibling.nextElementSibling.disabled = false;

  e.target.nextElementSibling.firstElementChild.innerText >= 20 ?
  e.target.disabled = true :
  e.target.disabled = false;
    
  }
  window.add = add;
const sub = (e) => {
  let value = e.target.previousElementSibling.firstElementChild.innerText - 1;
  e.target.previousElementSibling.firstElementChild.innerHTML = value;

  e.target.previousElementSibling.firstElementChild.innerHTML >= 20 ? 
  e.target.previousElementSibling.previousElementSibling.disabled = true : 
  e.target.previousElementSibling.previousElementSibling.disabled = false;

  e.target.previousElementSibling.firstElementChild.innerHTML <= '1'? 
  e.target.disabled = true : 
  e.target.disabled = false;

  
  }
  window.sub = sub;
  const abc = async () => {
    const docSnap1 = await getDocs(query(collection(db, 'Fruit')));
    const docSnap2 = await getDocs(query(collection(db, 'Meat')));
    const docSnap3 = await getDocs(query(collection(db, 'Grocery Items')));
    const docSnap4 = await getDocs(query(collection(db, 'Vegetable')));

    docSnap1.forEach((doc) => {
      const abc = JSON.parse(localStorage.getItem(`${doc._key.path.segments[6]}`));
      if (abc === null) {

      } else {
        let div = `<div class="shooping_cart_images_main_div">
        <div class="shopping_image">
          <img src="${abc.ImageUrl?abc.ImageUrl:itemImg}" alt="" />
          <div class="flexCol">
          <h3>${abc.ItemName}</h3>
          <p>Quantity: ${abc.Quantity} ${abc.UnitName}</p>
          <p class="ammount">RS: ${abc.UnitPrice}</p>
          </div>

          <div class="flexCol">

          <p>KG / Dozen / Pieces</p>

          <div class="counter_main">
            <button class='counter_button' onClick="add(event)">+</button>
            <span type="text" ><p class='number'>1</p></span>
            <button disabled class='counter_button' onClick="sub(event)">-</button>
            </div>
            
            </div>

        </div>
       

      </div>`
        console.log(abc)
        document.getElementById('cartItem').innerHTML += div;
        price.push(abc.UnitPrice);
      }
    })

    docSnap2.forEach((doc) => {
      const abc = JSON.parse(localStorage.getItem(`${doc._key.path.segments[6]}`));
      if (abc === null) {

      } else {
        let div = `<div class="shooping_cart_images_main_div">
        <div class="shopping_image">
          <img src="${abc.ImageUrl?abc.ImageUrl:itemImg}" alt="" />
          <div class="flexCol">
          <h3>${abc.ItemName}</h3>
          <p>Quantity: ${abc.Quantity} ${abc.UnitName}</p>
          <p class="ammount">RS: ${abc.UnitPrice}</p>
          </div>

          <div class="flexCol">

          <p>KG / Dozen / Pieces</p>

          <div class="counter_main">
            <button class='counter_button' onClick="add(event)">+</button>
            <span type="text" ><p class='number'>1</p></span>
            <button disabled class='counter_button' onClick="sub(event)">-</button>
            </div>
            
            </div>

        </div>
       

      </div>`
        console.log(abc)
        document.getElementById('cartItem').innerHTML += div;
        price.push(abc.UnitPrice);
      }
    })

    docSnap3.forEach((doc) => {
      const abc = JSON.parse(localStorage.getItem(`${doc._key.path.segments[6]}`));
      if (abc === null) {

      } else {
        let div = `<div class="shooping_cart_images_main_div">
        <div class="shopping_image">
          <img src="${abc.ImageUrl?abc.ImageUrl:itemImg}" alt="" />
          <div class="flexCol">
          <h3>${abc.ItemName}</h3>
          <p>Quantity: ${abc.Quantity} ${abc.UnitName}</p>
          <p class="ammount">RS: ${abc.UnitPrice}</p>
          </div>

          <div class="flexCol">

          <p>KG / Dozen / Pieces</p>

          <div class="counter_main">
            <button class='counter_button' onClick="add(event)">+</button>
            <span type="text" ><p class='number'>1</p></span>
            <button disabled class='counter_button' onClick="sub(event)">-</button>
            </div>
            
            </div>

        </div>
       

      </div>`
        console.log(abc)
        document.getElementById('cartItem').innerHTML += div;
        price.push(abc.UnitPrice);
      }
    })

    docSnap4.forEach((doc) => {
      const abc = JSON.parse(localStorage.getItem(`${doc._key.path.segments[6]}`));
      if (abc === null) {

      } else {
        let div = `<div class="shooping_cart_images_main_div">
        <div class="shopping_image">
          <img src="${abc.ImageUrl?abc.ImageUrl:itemImg}" alt="" />
          <div class="flexCol">
          <h3>${abc.ItemName}</h3>
          <p>Quantity: ${abc.Quantity} ${abc.UnitName}</p>
          <p class="ammount">RS: ${abc.UnitPrice}</p>
          </div>

          <div class="flexCol">

          <p>KG / Dozen / Pieces</p>

          <div class="counter_main">
            <button class='counter_button' onClick="add(event)">+</button>
            <span type="text" ><p class='number'>1</p></span>
            <button disabled class='counter_button' onClick="sub(event)">-</button>
            </div>
            
            </div>

        </div>
       

      </div>`
        console.log(abc)
        document.getElementById('cartItem').innerHTML += div;
        price.push(abc.UnitPrice);
      }
    })

  }

  window.abc = abc;

  useEffect(() => {
    abc()
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

      <img className="shopping_proifle" src={fileUrl ? fileUrl : profile} alt="" />
      <div className="shpping_div">
        <div className="shopping_cart_div">
          <div className="shopping_cart_heading">
            <h1>Shopping</h1>
            <p>Cart</p>
          </div>
          <div className="shopping_icon"><DeleteIcon /></div>
        </div>

        <div id="cartItem" className="shoppingItemsMain">

          
        </div>


        <div className="total">
          <div className="total_heading">Total</div>
          <div className="total_amount"></div>
        </div>

        <input type="text" className="input shop_input" placeholder='Enter Full Name' />
        <input type="text" className="input shop_input" placeholder='Enter Email' />
        <input type="text" className="input shop_input" placeholder='Enter Phone Number' />
        <input type="text" className="input shop_input" placeholder='Enter shipping address'></input>

        <div className="order_button_div">
          <button className='order_button'> <Link to='' className='link'  > Place Order</Link> </button>
        </div>

      </div>
      <UserFooter />





    </>
  )
}

export default UserShoppingCart
