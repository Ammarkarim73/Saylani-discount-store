import React, { useEffect, useState } from 'react'
import { Footer } from '../../Components'
import CategoryBar from '../../Components/CategoryBar/CategoryBar'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import itemImg from '../../Assets/Images/item.png'
import { db } from '../../Firebase/firebase'

export default function Vegetables() {
  const [itemName, setItemName] = useState('')
  const [unitName, setUnitName] = useState('')
const [quantity, setQuantity] = useState('')
const [unitPrice, setPrice] = useState('')
const [url, setUrl] = useState('')

const getData = async () => {
  let div = document.getElementById("products");

  const docSnap = await getDocs(collection(db, "Vegetable"));

  docSnap.forEach((doc) => {
    setItemName(doc.data().ItemName)
    setUnitName(doc.data().UnitName)
    setPrice(doc.data().UnitPrice)
    setQuantity(doc.data().Quantity)
    setUrl(doc.data().ImageUrl)

    div.innerHTML +=
      `<div class='card_main_div'>
    <div class='product_card_div'>
      <img class='card_img' src=${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg} />
      <div class='product_main_div'>
        <p class='product_name'>${doc.data().ItemName}</p>
        <div class='productPrice'>
        <p> Price: ${doc.data().UnitPrice} RS</p>
        </div>
        <div class='productQuantity'>
        <p> Quantity: ${doc.data().Quantity} ${doc.data().UnitName}</p>
        </div>

   </div>
   </div>
   </div>`;
  })
}



useEffect(() => {
  getData();
},[""])

  return (
    <div>
    <CategoryBar backBtn={'true'} loc={"Vegetables"} />
    <div id='products' className='admin_home_div'>
      <h3>Vegetables</h3>

    </div>
    <Footer/>
  </div>
  )
}
