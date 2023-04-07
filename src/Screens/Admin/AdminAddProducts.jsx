import React, { useState } from 'react';
import { Navbar } from '../../Components'
import camera_img from '../../Assets/Images/camera_img.png'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Dropdown, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Footer } from '../../Components/index'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../Firebase/firebase';
function AdminAddProducts() {
  const [fileList, setFileList] = useState([]);
  const [itemName, setItemName] = useState('')
  const [dropDown, setDropDown] = useState('')
  const [description, setDescription] = useState('')
  const [unitName, setUnitName] = useState('')
  const [unitPrice, setPrice] = useState('')
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const AddProduct = async() => {
    await addDoc(collection(db, "Products"), {
        ItemName: itemName,
        ImageUrl:fileList[0]?.thumbUrl,
        Category:dropDown,
        Description:description,
        UnitName:unitName,
        UnitPrice:unitPrice
      });
      setFileList([])
      setItemName('')
      setDropDown('')
      setDescription('')
      setUnitName('')
      setPrice('')
  }
  return (
    <div>
      <Navbar backBtn={'true'} loc={"Items"} />
      <div>
        <h2 className='Add_item_heading'>Add New Item</h2>
        <div className='camera_main_div'>
          {/* <img className='admin_camera' src={camera_img} alt="" /> */}
          {/* <CameraAltIcon className='camera_icon' /> */}
          <ImgCrop rotate>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && <div style={{ width: '0' }}><CameraAltIcon className='camera_icon' /></div>}
            </Upload>
          </ImgCrop>
        </div>
        <div className='inputs_div'>
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className='inp' placeholder='Item Name' />
        </div>
        <div className='inputs_div'>
          <select className='inp' value={dropDown} onChange={(e)=> setDropDown(e.target.value)}>
            <option value='Meat'>Meat</option>
            <option value="Chicken">Chicken</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
          </select>
        </div>
        <div className='inputs_div'>
          <textarea className='text_area' value={description} onChange={(e)=> setDescription(e.target.value)} placeholder='Description this Item' rows="6" cols="50" />
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Unit Name:</span>
          <input value={unitName} onChange={(e)=> setUnitName(e.target.value)} type="text" className='inp unit_inp' placeholder='Pcs./kg/dozen' />
        </div>
        <div className='unit_name_div'>
          <span style={{ color: 'blue', fontSize: '25px' }}>Unit Price:</span>
          <input value={unitPrice} onChange={(e)=> setPrice(e.target.value)} type="text" className='inp unit_inp' placeholder='Pkr' />
        </div>
        <div className="signup_button_div" style={{ margin: '20px auto', textAlign: 'center' }}>
          <button className='get_Started_button' style={{ color: 'white' }} onClick={AddProduct}>Add Product</button>
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default AdminAddProducts
