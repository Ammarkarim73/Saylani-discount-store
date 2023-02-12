import React, { useState } from 'react'
import profile from '../../Assets/Images/Profile.png'
import CheckIcon from '@mui/icons-material/Check';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import fruits from '../../Assets/Images/fruits.png'
import { Footer } from '../../Components/index'

function AdminProfile() {
  const [fileList, setFileList] = useState([]);
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
  return (
    <div>
      <div className='profile_main_div'>
        <h1 style={{ fontSize: '40px', color: 'blue' }}>Setting</h1>
        <img className='profile_img' src={profile} alt="" />
      </div>
      <div className="input-div one">
        <div className="i">
          <CheckIcon className='form_icon' />
        </div>
        <div className="div">
          <input type="text" className="input" placeholder='Update Your Name' />
        </div>
      </div>
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
      <div className='unit_name_div'>
        <input type="text" className='inp unit_inp' placeholder='Pkr' />
        <button style={{ color: 'white', border: 'none', borderRadius: '10px', width: '20%', backgroundColor: '#61B846', fontSize: '20px' }}>Add</button>
      </div>
      <div>
        <h1 style={{ color: 'blue', marginLeft: '15%' }}>All Category</h1>
        <div className='category_div' style={{ backgroundColor: 'white', border: '1px solid #61B846', height: '15vh' }}>
          <img src={fruits} alt="" />
          <span style={{ color: '#61B846', fontWeight: 'bold' }}>Fruits</span>
        </div>
      </div>
      <div className="signup_button_div" style={{ margin: '20px auto', textAlign: 'center' }}>
        <button className='get_Started_button' style={{ color: 'white' }}>Logout</button>
      </div>
      <Footer />
    </div>
  )
}

export default AdminProfile
