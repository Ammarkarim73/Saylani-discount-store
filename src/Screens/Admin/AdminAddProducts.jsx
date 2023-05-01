import React, { useEffect, useState } from 'react';
import profile from '../../Assets/Images/item.png'
import { Navbar } from '../../Components'
import { Footer } from '../../Components/index'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../Firebase/firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Swal from 'sweetalert2';

function AdminAddProducts() {
  const [fileUrl, setFileUrl] = useState('');
  const [itemName, setItemName] = useState('')
  const [dropDown, setDropDown] = useState('')
  const [description, setDescription] = useState('')
  const [unitName, setUnitName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unitPrice, setPrice] = useState('')
  const [alert, showAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')


  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  const upload = async (fileList) => {
    // setFileList(fileList);

    // profile Upload
    const uploadFiles = (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const storageRef = ref(storage, `Products/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            let upLoad = "Upload is " + progress + "% done";
            if (upLoad == "Upload is 100% done") {

              showAlert(true)
              setAlertMsg("Picture Uploaded Successfully..!")

              setTimeout(() => {
                showAlert(false)
              }, 3000);

              console.log('Picture Uploaded Successfully..!')
            } else {


              showAlert(true)
              setAlertMsg(progress + '% Uploaded')

              console.log('Uploading ' + progress + '% done')

            }
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

              document.querySelector("#showProductPic").style.backgroundImage = `url(${downloadURL})`;

              console.log(resolve(downloadURL));


            });
          }
        );
      });
    };
    // profile upload



    let url = await uploadFiles(fileList.files[0]);
    setFileUrl(url)

  }

  const addProduct = async () => {
    let date = new Date()
    if (itemName && dropDown && description && unitName && quantity && unitPrice) {
      await addDoc(collection(db, dropDown), {
        ItemName: itemName,
        ImageUrl: fileUrl,
        Category: dropDown,
        Description: description,
        UnitName: unitName,
        Quantity: quantity,
        UnitPrice: unitPrice,
        timestamp: date,
      }) 
      setItemName('')
      setDropDown('')
      setDescription('')
      setUnitName('')
      setQuantity('')
      setPrice('')
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Please Input All Fields !!!'
      })
    }
  }





  return (
    <div>
      <Navbar backBtn={'true'} loc={"Items"} alert={alert} alertMsg={alertMsg} />
      <div>
        <h2 className='Add_item_heading'>Add New Item</h2>


        {/* Product Image */}

        <div className="flexrow">
          <img id="showProductPic" onClick={() => { window.open(fileUrl ? fileUrl : profile) }} src={fileUrl ? fileUrl : profile} />


          <label id="productLabel" htmlFor="file" > +
            <input id="file" onChange={(e) => { upload(e.target) }} style={{ display: 'none' }} type="file" accept="image/*" />
          </label>
        </div>

        {/* Product Image */}

        <div className='inputs_div'>
          <input type="text" onChange={(e) => { setItemName(e.target.value) }} id='itemName' className='inp' placeholder='Item Name' />
        </div>
        <div className='inputs_div'>
          <select className='inp' onChange={(e) => { setDropDown(e.target.value) }} id='dropDown' >
            <option>Select Category</option>
            <option value='Meat'>Meat</option>
            <option value="Grocery Items">Grocery Items</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
          </select>
        </div>
        <div className='inputs_div'>
          <textarea onChange={(e) => { setDescription(e.target.value) }} className='text_area' id='description' placeholder='Description this Item' rows="6" cols="50" />
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Unit Name:</span>
          {/* <input value={unitName} onChange={(e)=> setUnitName(e.target.value)} type="text" className='inp unit_inp' placeholder='Pcs./kg/dozen' /> */}
          <select onChange={(e) => { setUnitName(e.target.value) }} className='inp unit_inp' id='unitName' >
            <option>Select Unit</option>
            <option value='KG'>KG</option>
            <option value="DOZEN">DOZEN</option>
            <option value="LITER">LITER</option>
            <option value="PIECES">PIECES</option>
          </select>
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Quantity:</span>
          <input onChange={(e) => { setQuantity(e.target.value) }} id='quantity' type="number" className='inp unit_inp' placeholder='eg. 2 Kg, 4 kg' />
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Unit Price:</span>
          <input onChange={(e) => { setPrice(e.target.value) }} id='unitPrice' type="number" className='inp unit_inp' placeholder='Pkr' />
        </div>
        <div className="signup_button_div" style={{ margin: '20px auto', textAlign: 'center' }}>
          <button className='get_Started_button' style={{ color: 'white' }} onClick={() => { addProduct() }}>Add Product</button>
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default AdminAddProducts
