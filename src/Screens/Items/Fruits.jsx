import React, { useEffect, useState } from 'react'
import { Footer } from '../../Components'
import CategoryBar from '../../Components/CategoryBar/CategoryBar'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import itemImg from '../../Assets/Images/item.png'
import { db } from '../../Firebase/firebase'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import UpdateItem from '../../Components/UpdateItem/UpdateItem'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Fruits() {
  const navigate = useNavigate('')

  const [update, setUpdate] = useState(false)
  const [itemName, setItemName] = useState('')
  const [unitName, setUnitName] = useState('')
  const [desc, setDesc] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unitPrice, setPrice] = useState('')
  const [url, setUrl] = useState('')
  const [productID, setProductID] = useState('')

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })

  const fire = (uid) => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "Fruit", uid));
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        )
        getData();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your item is safe :)',
          'error'
        )
      }
    })
  }

  window.fire = fire;




  const updateItem = (uid, imgUrl, itemName, unitName, unitPrice, Quantity, desc) => {
    Swal.fire({
      title: 'ITEM DETAILS',
      html:
        `<img id="showProductPic" src="${imgUrl}" />` +
        `<br />` +
        `<p><b>Item Name:</b> ${itemName}</p>` +
        `<p><b>Category:</b> Fruits </p>` +
        `<p><b>Description:</b> ${desc} </p>` +
        `<br />` +
        `<p><b>Unit Name:</b> ${unitName}</p>` +
        `<p><b>Unit Price:</b> ${unitPrice}</p>` +
        `<p><b>Quantity:</b> ${Quantity}</p>` +
        `<br />` +
        `<button class='get_Started_button' onclick="fire('${uid}')">Delete Item</button>`,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: 'EDIT / UPDATE',
      preConfirm: () => {
        setUpdate(true)

        setProductID(uid)
        setItemName(itemName)
        setUnitName(unitName)
        setDesc(desc)
        setPrice(unitPrice)
        setQuantity(Quantity)
        setUrl(imgUrl)
      }
    })
  }

  window.updateItem = updateItem;



  const getData = async () => {
    let div = document.getElementById("products");
    div.innerHTML = '';

    const docSnap = await getDocs(collection(db, "Fruit"));

    docSnap.forEach((doc) => {
      div.innerHTML +=
        `<div onclick="updateItem('${doc._key.path.segments[6]}', '${doc.data().ImageUrl ? doc.data().ImageUrl : itemImg}', '${doc.data().ItemName}', '${doc.data().UnitName}', '${doc.data().UnitPrice}', '${doc.data().Quantity}', '${doc.data().Description}')" class='card_main_div'>
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
  }, [""])

  return (
    <>
      {
        update === true ?
          <UpdateItem category="Fruit" pID={productID} productImg={url} productName={itemName} productUnitName={unitName} productDesc={desc} productQuantity={quantity} productUnitPrice={unitPrice} /> :
          <div>
            <CategoryBar className={'categoryBar'} backBtn={'true'} loc={"Fruits"} />
            <div id='products' className='admin_home_div'>
              <h3>Fruits</h3>

            </div>
            <Footer />
          </div>
      }
    </>
  )
}
