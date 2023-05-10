import React, { useEffect, useState } from 'react'
import profile from '../../Assets/Images/Profile.png'
import { Footer, Navbar } from '../../Components/index'
import { collection, doc, getDoc, updateDoc, } from "firebase/firestore";
import { db } from '../../Firebase/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { CheckCircleOutline } from '@mui/icons-material';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Swal from 'sweetalert2';
import {UserFooter} from '../../Components/index'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate('')

  const [fileUrl, setFileUrl] = useState('');
  const [classActive, setClassActive] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [uid, setuid] = useState('')

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
        const storageRef = ref(storage, `Users/${uid}.png`);
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
                title: 'Picture Uploaded Successfully..!',
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

              // document.querySelector("#showPic").style.backgroundImage = `url(${downloadURL})`;

              console.log(resolve(downloadURL));


            });
          }
        );
      });
    };
    // profile upload



    let url = await uploadFiles(fileList.files[0]);
    setFileUrl(url);
    const washingtonRef = doc(db, "Users", uid);
    await updateDoc(washingtonRef, {
      profile: url,
    });

  };


  const signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      Toast.fire({
        icon: 'success',
        title: 'Signed Out Successfully..!'
      })
    }).catch((error) => {
      console.log(error.message);
      // An error happened.
    });
  }


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setuid(user.uid)
        const docSnap = await getDoc(doc(db, "Users", user.uid));
        setFileUrl(docSnap.data().profile)
        setName(docSnap.data().username)
        setNumber(docSnap.data().number)
      } else {
        // User is signed out
        // ...
        navigate('/login');
      }
    });
  }, [""])

  const addDataToFirestore = async (name) => {


    try {
      const docRef = await updateDoc(doc(db, "Users", uid), {
        username: name
      });
      Toast.fire({
        icon: 'success',
        title: 'Your Data Has Been Saved..!'
      })
      console.log("Username written in database");
    } catch (e) {
      Toast.fire({
        icon: 'error',
        title: 'Error While Saving Name' + e.message
      })
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <div>
        <div className='profile_main_div'>
          <h1 style={{ fontSize: '40px', color: 'blue' }}>Profile</h1>
          <div className="flexcol">
            <img onClick={() => {
              Swal.fire({
                imageUrl: `${fileUrl ? fileUrl : profile}`,
                imageWidth: 450,
                imageHeight: 500,
                showConfirmButton: false,
              })
            }} src={fileUrl ? fileUrl : profile} id="showPic" className="picture" />

            <label id="label" htmlFor="file" > + UPLOAD PICTURE
              <input id="file" onChange={(e) => { upload(e.target) }} style={{ display: 'none' }} type="file" accept="image/*" />
            </label>

            <div className="input-div one">
              <div className="div">
                <b>Name: </b><input type="text" value={name} onFocus={()=>{setClassActive('name')}} onBlur={()=>{setClassActive('')}} onChange={(e) => {
                  setName(e.target.value)
                }} className={classActive==='name'?"input outlineActive":"input"} placeholder='Enter Your Name' />
              </div>
            </div>

            <div className="input-div one">
              <div className="div">
                <b>Number: </b><input maxLength={11} type="text" value={number} onFocus={()=>{setClassActive('number')}} onBlur={()=>{setClassActive('')}} onChange={(e) => {
                  setNumber(e.target.value)
                }} className={classActive==='number'?"input outlineActive":"input"} placeholder='Enter Your Number' />
              </div>
            </div>
            <div className="input-div one">
            <div className="div">
                <Button variant="contained" color="success"
                  onClick={() => {
                    if (name && number) {
                      addDataToFirestore(name);
                    } else {
                      Toast.fire({
                        icon: 'error',
                        title: "Name or Number Can't Be Empty !!!"
                      })
                    }
                  }}
                   >Update</Button>
              </div>
              </div>

          </div>
        </div>



        <div className='admin_order_main_div'>
          <h1 style={{ color: 'blue' }}>Pending Orders</h1>
          <div className="order_inner_div">
            <h3 className='user_name'>Nawaz-uddin</h3>
            <div className="status_div">
              <p> Just Now - Pending</p>
              <p>03208908424</p>
            </div>
            <div className="item_name_div">
              <p>2 x ITEM NAME</p>
              <p>3 x ITEM NAME </p>
            </div>
            <div className="items_total_div">
              <p><b>Total</b></p>
              <p className="item_price" >$185</p>
            </div>
            <div className='inputs_div2'>
              <Button variant="contained" color="success"
              onClick={()=>{
                Toast.fire({
                  icon: 'success',
                  title: "Your Order Has Been Canceled !!!"
                })
              }}
              >Cancel Order</Button>
            </div>
          </div>
        </div>
        <div className="signup_button_div" style={{ margin: '20px auto', textAlign: 'center' }}>
          <button className='get_Started_button' onClick={() => { signout() }} style={{ color: 'white' }}>Logout</button>
        </div>

        <UserFooter />
      </div>
    </>
  )
}

export default UserProfile
