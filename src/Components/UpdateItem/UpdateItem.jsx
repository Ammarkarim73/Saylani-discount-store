import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { db } from '../../Firebase/firebase';
import itemImg from '../../Assets/Images/item.png'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';


export default function UpdateItem(props) {
  const navigate = useNavigate('');

  const [fileUrl, setFileUrl] = useState(props.productImg);
  const [itemName, setItemName] = useState(props.productName)
  const [dropDown, setDropDown] = useState(props.category)
  const [description, setDescription] = useState(props.productDesc)
  const [unitName, setUnitName] = useState(props.productUnitName)
  const [quantity, setQuantity] = useState(props.productQuantity)
  const [unitPrice, setPrice] = useState(props.productUnitPrice)




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

              Toast.fire({
                icon: 'info',
                title: 'Picture Uploaded Successfully..!'
              })

              console.log('Picture Uploaded Successfully..!')
            } else {



              Toast.fire({
                icon: 'info',
                title: progress + '% Uploaded'
              })

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

              // document.querySelector("#showProductPic").style.backgroundImage = `url(${downloadURL})`;

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
      await updateDoc(doc(db, dropDown, props.pID), {
        ItemName: itemName,
        ImageUrl: fileUrl,
        Description: description,
        UnitName: unitName,
        Quantity: quantity,
        UnitPrice: unitPrice,
        timestamp: date,
      })
      setItemName('')
      setDescription('')
      setUnitName('')
      setQuantity('')
      setPrice('')
      setFileUrl('')

      Toast.fire({
        icon: 'success',
        title: 'Your Item Updated Successfully!'
      })
      setTimeout(() => {
        navigate('/admin/home');
      }, 3000);
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Please Input All Fields !!!'
      })
    }
  }




  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xl: 'block', xs: 'block' } }}
              onClick={() => { navigate('/admin/home') }}
            >
              <ArrowBackIosNewIcon className={'navbar_icon'} />
            </IconButton>
            <Typography variant="p" component="div" sx={{ flexGrow: 40 }} >
              <span style={{ color: 'blue', fontWeight: 'bold', fontSize: "24px", textAlign: "center" }}>Update Item</span>
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
        </div>
      </Box>
      <br />
      <div>
        {/* Product Image */}

        <div className="flexrow">
          <img id="showProductPic" onClick={() => {
            Swal.fire({
              imageUrl: `${fileUrl ? fileUrl : itemImg}`,
              imageWidth: 450,
              imageHeight: 450,
              showConfirmButton: false,
            })
          }} src={fileUrl ? fileUrl : itemImg} />


          <label id="productLabel" htmlFor="file" > +
            <input id="file" onChange={(e) => { upload(e.target) }} style={{ display: 'none' }} type="file" accept="image/*" />
          </label>
        </div>

        {/* Product Image */}

        <div className='inputs_div'>
          <input value={itemName} type="text" onChange={(e) => { setItemName(e.target.value) }} id='itemName' className='inp' placeholder='Item Name' />
        </div>
        <div className='inputs_div'>
          <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} className='text_area' id='description' placeholder='Description this Item' rows="6" cols="50" />
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Unit Name:</span>
          {/* <input value={unitName} onChange={(e)=> setUnitName(e.target.value)} type="text" className='inp unit_inp' placeholder='Pcs./kg/dozen' /> */}
          <select value={unitName} onChange={(e) => { setUnitName(e.target.value) }} className='inp unit_inp' id='unitName' >
            <option>Select Unit</option>
            <option value='KG'>KG</option>
            <option value="DOZEN">DOZEN</option>
            <option value="LITER">LITER</option>
            <option value="PIECES">PIECES</option>
          </select>
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Quantity:</span>
          <input value={quantity} onChange={(e) => { setQuantity(e.target.value) }} id='quantity' type="number" className='inp unit_inp' placeholder='eg. 2 Kg, 4 kg' />
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Unit Price:</span>
          <input value={unitPrice} onChange={(e) => { setPrice(e.target.value) }} id='unitPrice' type="number" className='inp unit_inp' placeholder='Pkr' />
        </div>
        <div className="signup_button_div" style={{ margin: '20px auto', textAlign: 'center' }}>
          <button className='get_Started_button' style={{ color: 'white' }} onClick={() => { addProduct() }}>Add Product</button>
        </div>
      </div>
    </>
  )
}
