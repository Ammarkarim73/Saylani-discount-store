import React, { useEffect, useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Grocery from '../../Assets/Images/grocery.png'
import SearchIcon from '@mui/icons-material/Search';
import ShopGrocery from '../../Assets/Images/shop_grocery.jpeg'
import vegetable from '../../Assets/Images/vegetable.png'
import meat from '../../Assets/Images/meat.jpeg'
import AddIcon from '@mui/icons-material/Add';
import { UserFooter } from '../../Components/index'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../Firebase/firebase';
function UserHome() {
  // const [data, setData] = useState([])
  const [active, setActive] = useState('All')
  let data = [{
    img: { meat },
    Name: 'meat',
    price: 'RS.800-per Kg'

  },
  {
    img: { meat },
    Name: 'meat',
    price: 'RS.800-per Kg'

  }]
  const getData = async (name) => {
    setActive(name);

    if (name==='All') {
      const q1 = query(collection(db, 'Fruit'));
      const querySnapshot1 = await getDocs(q1);
  
      querySnapshot1.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            // data = doc.data()
            // setData([...data,{doc.data()}])
          });

          // skip
          
      const q2 = query(collection(db, 'Vegetable'));
      const querySnapshot2 = await getDocs(q2);
  
      querySnapshot2.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            // data = doc.data()
            // setData([...data,{doc.data()}])
          });

          // skip
      const q3 = query(collection(db, 'Meat'));
      const querySnapshot3 = await getDocs(q3);
  
      querySnapshot3.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            // data = doc.data()
            // setData([...data,{doc.data()}])
          });

          // skip
      const q4 = query(collection(db, 'Grocery Items'));
      const querySnapshot4 = await getDocs(q4);
  
      querySnapshot4.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            // data = doc.data()
            // setData([...data,{doc.data()}])
          });

          // skip

    } else {
      const q = query(collection(db, name));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            // data = doc.data()
            // setData([...data,{doc.data()}])
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
          <SearchIcon />     <input type="text" className="search" placeholder='Seacrh by Product NAme' />
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


          {/* {
            data?.map((v, i) => {
              return (
                <>
                  <div className="categery_description">
                    <div className="cateries">
                      <div className="cateries_image"><img src={v?.ImageUrl} alt="" /></div>
                      <div className="Description">
                        <h1>{v?.ItemName}</h1>
                        <p>This is product description </p>
                        <p> This is abc product description</p>


                      </div>
                      <div className="categries_button">
                        <p>{v?.UnitPrice}</p>
                        <buttono onClick={add} ><AddIcon /></buttono>
                      </div>
                    </div>

                  </div>
                </>
              )
            })
          } */}





{/* im opening this ==> */}

          <div className="categery_description">
            <div className="cateries">
              <div className="cateries_image"><img src={meat} alt="" /></div>
              <div className="Description">
                <h1>Meat</h1>
                <p>This is product description </p>
                   <p> This is abc product description</p>


              </div>
              <div className="categries_button">
              <p>RS.800-per Kg</p>
                <button ><AddIcon/></button>
              </div>
            </div>

          </div>

          {/* this */}

        </div>
        <UserFooter />
      </div>
    </>
  )
}

export default UserHome
