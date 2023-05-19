import React, { useEffect, useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Grocery from '../../Assets/Images/grocery.png'
import SearchIcon from '@mui/icons-material/Search';
import ShopGrocery from '../../Assets/Images/shop_grocery.jpeg'
import vegetable from '../../Assets/Images/vegetable.png'
import meat from '../../Assets/Images/meat.jpeg'
import itemImg from '../../Assets/Images/item.png'
import AddIcon from '@mui/icons-material/Add';
import { UserFooter } from '../../Components/index'
import { collection, query, getDocs, setDoc, doc, getDoc, } from "firebase/firestore";
import { db } from '../../Firebase/firebase';
import { Typography } from 'antd';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';
function UserHome() {
  const [active, setActive] = useState('All')
  const [disable, setDisable] = useState('')
  // const abc = localStorage.getItem('cartItem')
  // console.log(JSON.parse(abc))

const addToCart = async (itemID, category) => {
  const auth = getAuth();
  const userID = auth.currentUser.uid;
  localStorage.setItem(userID + itemID, itemID)
  const docSnap = await getDoc(doc(db, category, itemID))
  localStorage.setItem(itemID, JSON.stringify(docSnap.data()))
  console.log('added')

}

window.addToCart = addToCart;


const details = (category, id, imgUrl, itemName, unitName, unitPrice, Quantity, desc) => {
  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const itemID = localStorage.getItem(userID + id);
  if(id===itemID){
    Swal.fire({
      title: 'ITEM DETAILS',
      html:
        `<img id="showProductPic" src="${imgUrl}" />` +
        `<br />` +
        `<p><b>Item Name:</b> ${itemName}</p>` +
        `<p><b>Category:</b> ${category} </p>` +
        `<p><b>Description:</b> ${desc} </p>` +
        `<br />` +
        `<p><b>Unit Name:</b> ${unitName}</p>` +
        `<p><b>Unit Price:</b> ${unitPrice}</p>` +
        `<p><b>Quantity:</b> ${Quantity}</p>` +
        `<br />` +
        `<button disabled class='get_Started_button' onclick="addToCart('${id}', '${category}')">Add To Cart ?</button>`,
      showCancelButton: false,
      showConfirmButton: false,
    })
  }else{
    Swal.fire({
      title: 'ITEM DETAILS',
      html:
        `<img id="showProductPic" src="${imgUrl}" />` +
        `<br />` +
        `<p><b>Item Name:</b> ${itemName}</p>` +
        `<p><b>Category:</b> ${category} </p>` +
        `<p><b>Description:</b> ${desc} </p>` +
        `<br />` +
        `<p><b>Unit Name:</b> ${unitName}</p>` +
        `<p><b>Unit Price:</b> ${unitPrice}</p>` +
        `<p><b>Quantity:</b> ${Quantity}</p>` +
        `<br />` +
        `<button class='get_Started_button' onclick="addToCart('${id}', '${category}')">Add To Cart ?</button>`,
      showCancelButton: false,
      showConfirmButton: false,
    })
  }
}

window.details = details;




  const getData = async (name) => {
    setActive(name);
    document.getElementById('abc').innerHTML = '';

    if (name==='All') {
      document.getElementById('name').innerHTML = "All Categories";

      const q1 = query(collection(db, 'Fruit'));
      const querySnapshot1 = await getDocs(q1);
  
      querySnapshot1.forEach((doc) => {
            let div = `<div class='card_main_div' onClick="details('Fruit', '${doc._key.path.segments[6]}', '${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg}', '${doc.data().ItemName}', '${doc.data().UnitName}', '${doc.data().UnitPrice}', '${doc.data().Quantity}', '${doc.data().Description}');">
                      <div class="cateries">
            <div class="cateries_image"><img src=${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg} alt="" /></div>
            <div class="Description">
              <h1>${doc.data().ItemName}</h1>
              <p>${doc.data().Description}</p>
                 <p>Item added on: ${doc.data().timestamp.toDate().toLocaleDateString()} at ${doc.data().timestamp.toDate().toLocaleTimeString()}</p>

            </div>
            <div class="categries_button">
            <p>RS: ${doc.data().UnitPrice}-per ${doc.data().Quantity} ${doc.data().UnitName}</p>
              <button style="font-size: 25px;"> + </button>
            </div>
            </div>
          </div>`;

          document.getElementById('abc').innerHTML += div;
          });

          // skip
          
      const q2 = query(collection(db, 'Vegetable'));
      const querySnapshot2 = await getDocs(q2);
  
      querySnapshot2.forEach((doc) => {
        let div = `<div class='card_main_div' onClick="details('Vegetable', '${doc._key.path.segments[6]}', '${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg}', '${doc.data().ItemName}', '${doc.data().UnitName}', '${doc.data().UnitPrice}', '${doc.data().Quantity}', '${doc.data().Description}');">
        <div class="cateries">
<div class="cateries_image"><img src=${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg} alt="" /></div>
<div class="Description">
<h1>${doc.data().ItemName}</h1>
<p>${doc.data().Description}</p>
   <p>Item added on: ${doc.data().timestamp.toDate().toLocaleDateString()} at ${doc.data().timestamp.toDate().toLocaleTimeString()}</p>

</div>
<div class="categries_button">
<p>RS: ${doc.data().UnitPrice}-per ${doc.data().Quantity} ${doc.data().UnitName}</p>
<button style="font-size: 25px;"> + </button>
</div>
</div>
</div>`;

document.getElementById('abc').innerHTML += div;
          });

          // skip
      const q3 = query(collection(db, 'Meat'));
      const querySnapshot3 = await getDocs(q3);
  
      querySnapshot3.forEach((doc) => {
        let div = `<div class='card_main_div' onClick="details('Meat', '${doc._key.path.segments[6]}', '${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg}', '${doc.data().ItemName}', '${doc.data().UnitName}', '${doc.data().UnitPrice}', '${doc.data().Quantity}', '${doc.data().Description}');">
        <div class="cateries">
<div class="cateries_image"><img src=${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg} alt="" /></div>
<div class="Description">
<h1>${doc.data().ItemName}</h1>
<p>${doc.data().Description}</p>
   <p>Item added on: ${doc.data().timestamp.toDate().toLocaleDateString()} at ${doc.data().timestamp.toDate().toLocaleTimeString()}</p>

</div>
<div class="categries_button">
<p>RS: ${doc.data().UnitPrice}-per ${doc.data().Quantity} ${doc.data().UnitName}</p>
<button style="font-size: 25px;"> + </button>
</div>
</div>
</div>`;

document.getElementById('abc').innerHTML += div;
          });

          // skip
      const q4 = query(collection(db, 'Grocery Items'));
      const querySnapshot4 = await getDocs(q4);
  
      querySnapshot4.forEach((doc) => {
        let div = `<div class='card_main_div' onClick="details('Grocery Items', '${doc._key.path.segments[6]}', '${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg}', '${doc.data().ItemName}', '${doc.data().UnitName}', '${doc.data().UnitPrice}', '${doc.data().Quantity}', '${doc.data().Description}');">
        <div class="cateries">
<div class="cateries_image"><img src=${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg} alt="" /></div>
<div class="Description">
<h1>${doc.data().ItemName}</h1>
<p>${doc.data().Description}</p>
   <p>Item added on: ${doc.data().timestamp.toDate().toLocaleDateString()} at ${doc.data().timestamp.toDate().toLocaleTimeString()}</p>

</div>
<div class="categries_button">
<p>RS: ${doc.data().UnitPrice}-per ${doc.data().Quantity} ${doc.data().UnitName}</p>
<button style="font-size: 25px;"> + </button>
</div>
</div>
</div>`;

document.getElementById('abc').innerHTML += div;
          });

          // skip

    } else {
      document.getElementById('name').innerHTML = name;
      const q = query(collection(db, name));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        let div = `<div class='card_main_div' onClick="details('${name}', '${doc._key.path.segments[6]}', '${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg}', '${doc.data().ItemName}', '${doc.data().UnitName}', '${doc.data().UnitPrice}', '${doc.data().Quantity}', '${doc.data().Description}');">
        <div class="cateries">
<div class="cateries_image"><img src=${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg} alt="" /></div>
<div class="Description">
<h1>${doc.data().ItemName}</h1>
<p>${doc.data().Description}</p>
   <p>Item added on: ${doc.data().timestamp.toDate().toLocaleDateString()} at ${doc.data().timestamp.toDate().toLocaleTimeString()}</p>

</div>
<div class="categries_button">
<p>RS: ${doc.data().UnitPrice}-per ${doc.data().Quantity} ${doc.data().UnitName}</p>
<button style="font-size: 25px;"> + </button>
</div>
</div>
</div>`;

document.getElementById('abc').innerHTML += div;
          });
    }

  }

  useEffect(() => {
    getData("All")
  }, [""])
  return (
    <>
      <div className="user_home_page_main_section">
        <div className="user_interface_navbar">
          <div className="users_heading">
            <h1>SAYLANI WELFARE</h1>
            <p>DISCOUNT STORE</p>
          </div>
          <div className="cart_icon">
            <AddShoppingCartIcon />
          </div>
        </div>

        <div className="discount_store_grocery_image_div">
          <img className='discount_store_grocery_image' src={Grocery} alt="" />
        </div>
        <div className="search_input_div">
          <SearchIcon />     <input type="text" className="search" placeholder='Seacrh by Product Name' />
        </div>
        <div className="shop_categery">
          <div className="shop_category_heading">
            Shop By Categery
          </div>
          <div className="section_of_category">
            <div onClick={()=> {getData('All')}} className={active==='All'?"categery_box outlineActiveBlue":"categery_box"}>
              <img src={ShopGrocery} alt="" />
              <p className='p'>All Categories</p>
            </div>
            <div onClick={()=> {getData('Fruit')}} className={active==='Fruit'?"categery_box outlineActiveBlue":"categery_box"}>
              <img src={vegetable} alt="" />
              <p className='p'>Fruits</p>
            </div>
            <div onClick={()=> {getData('Vegetable')}} className={active==='Vegetable'?"categery_box outlineActiveBlue":"categery_box"}>
              <img src={ShopGrocery} alt="" />
              <p className='p'>Vegetable</p>
            </div>
            <div onClick={()=> {getData('Meat')}} className={active==='Meat'?"categery_box outlineActiveBlue":"categery_box"}>
              <img src={ShopGrocery} alt="" />
              <p className='p'>Meat</p>
            </div>
            <div onClick={()=> {getData('Grocery Items')}} className={active==='Grocery Items'?"categery_box outlineActiveBlue":"categery_box"}>
              <img src={ShopGrocery} alt="" />
              <p className='p'>Grocery Items</p>
            </div>
          </div>

{/* 
          {
            data?.map((v) => {
              console.log(v.img)
              return (
                <>
                  <div className="categery_description">
                    <div className="cateries">
                      <div className="cateries_image"><img src={v.img} alt="" /></div>
                      <div className="Description">
                        <h1>{v.Name}</h1>
                        <p>This is product description </p>
                        <p> This is abc product description</p>


                      </div>
                      <div className="categries_button">
                        <p>{v.price}</p>
                        <button onClick={()=>{}} ><AddIcon /></button>
                      </div>
                    </div>

                  </div>
                </>
              )
            })
          } */}





{/* im opening this ==> */}

            <div style={{marginTop: '2em', marginBottom: '1.5em' }}>
              <span id='name' style={{ color: 'blue', fontWeight: 'bold', fontSize: "24px", textAlign: "center", marginTop: '2em', marginBottom: '1.5em' }}></span>
             </div>

          <div id='abc'>
          
          </div>

          {/* this */}

        </div>
        <UserFooter />
      </div>
    </>
  )
}

export default UserHome
