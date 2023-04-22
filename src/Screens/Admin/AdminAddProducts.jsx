import React, { useEffect, useState } from 'react';
import profile from '../../Assets/Images/item.png'
import { Navbar } from '../../Components'
import { Footer } from '../../Components/index'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../Firebase/firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

function AdminAddProducts() {
    const [fileUrl, setFileUrl] = useState('');
    // const [itemName, setItemName] = useState('')
    // const [dropDown, setDropDown] = useState('')
    // const [description, setDescription] = useState('')
    // const [unitName, setUnitName] = useState('')
    // const [quantity, setQuantity] = useState('')
    // const [unitPrice, setPrice] = useState('')
    const [alert, showAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
  


  
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

              // document.querySelector("#showPic").style.backgroundImage = `url(${downloadURL})`;

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
  
  const addProduct = async (url) => {
    let category = document.getElementById('dropDown').value;
    if(category){
    let date = new Date()
    let name = document.getElementById('itemName').value;
    let desc = document.getElementById('description').value;
    let unit = document.getElementById('unitName').value;
    let quantity = document.getElementById('quantity').value;
    let price = document.getElementById('unitPrice').value;
    console.log(category)
    await addDoc(collection(db, category), {
        ItemName: name,
        ImageUrl: url,
        Category:category,
        Description:desc,
        UnitName:unit,
        Quantity:quantity,
        UnitPrice:price,
        timestamp: date,
      });
      // setItemName('')
      // setDropDown('')
      // setDescription('')
      // setUnitName('')
      // setPrice('')
    }
}


  return (
    <div>
      <Navbar backBtn={'true'} loc={"Items"} />
      <div>
        <h2 className='Add_item_heading'>Add New Item</h2>

        {/* Product Image */}

        <div className="flexrow">
            <img onClick={() => { window.open(fileUrl?fileUrl:profile) }} src={fileUrl ? fileUrl:profile} id="showProductPic" />


            <label id="productLabel" htmlFor="file" > +
              <input id="file" onChange={(e) => { upload(e.target) }} style={{ display: 'none' }} type="file" accept="image/*" />
            </label>
          </div>

        {/* Product Image */}

        <div className='inputs_div'>
          <input type="text" id='itemName' className='inp' placeholder='Item Name' />
        </div>
        <div className='inputs_div'>
          <select className='inp' id='dropDown' >
            <option value='Meat'>Meat</option>
            <option value="Grocery Items">Grocery Items</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
          </select>
        </div>
        <div className='inputs_div'>
          <textarea className='text_area' id='description' placeholder='Description this Item' rows="6" cols="50" />
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Unit Name:</span>
          {/* <input value={unitName} onChange={(e)=> setUnitName(e.target.value)} type="text" className='inp unit_inp' placeholder='Pcs./kg/dozen' /> */}
          <select className='inp unit_inp' id='unitName' >
            <option value='KG'>KG</option>
            <option value="DOZEN">DOZEN</option>
            <option value="LITER">LITER</option>
            <option value="PIECES">PIECES</option>
          </select>
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Quantity:</span>
          <input id='quantity' type="number" className='inp unit_inp' placeholder='eg. 2 Kg, 4 kg' />
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Unit Price:</span>
          <input id='unitPrice' type="number" className='inp unit_inp' placeholder='Pkr' />
        </div>
        <div className="signup_button_div" style={{ margin: '20px auto', textAlign: 'center' }}>
          <button className='get_Started_button' style={{ color: 'white' }} onClick={addProduct(fileUrl)}>Add Product</button>
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default AdminAddProducts
