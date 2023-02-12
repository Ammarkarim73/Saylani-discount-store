import React, { useState } from 'react'
import profile from '../../Assets/Images/Profile.png'
import CheckIcon from '@mui/icons-material/Check';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import fruits from '../../Assets/Images/fruits.png'
import { Order, UserFooter } from '../../Components/index'

function UserProfile() {
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
      <Order/>
      <div className="signup_button_div" style={{ margin: '20px auto', textAlign: 'center' }}>
        <button className='get_Started_button' style={{ color: 'white' }}>Logout</button>
      </div>
      <UserFooter />
    </div>
  )
}

export default UserProfile
