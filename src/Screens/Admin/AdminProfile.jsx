import React, { useEffect, useState } from 'react'
import profile from '../../Assets/Images/Profile.png'
import { Footer, Navbar } from '../../Components/index'
import { doc, getDoc, updateDoc, } from "firebase/firestore";
import { db } from '../../Firebase/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { CheckCircleOutline } from '@mui/icons-material';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Swal from 'sweetalert2';

function AdminProfile() {
  const [fileUrl, setFileUrl] = useState('');
  const [classActive, setClassActive] = useState('')
  const [alert, showAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [name, setName] = useState('')

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
        const storageRef = ref(storage, `Admin/admin.png`);
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
    setFileUrl(url);
    const washingtonRef = doc(db, "Admin", "admin");
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
      const docSnap = await getDoc(doc(db, "Admin", "admin"));
      setName(docSnap.data().username)
      setFileUrl(docSnap.data().profile)
    });
  }, [""])

  const addDataToFirestore = async (name) => {


    try {
      const docRef = await updateDoc(doc(db, "Admin", 'admin'), {
        username: name
      });
      showAlert(true)
      setAlertMsg('Your Name Has Been Saved')

      setTimeout(() => {
        showAlert(false)
      }, 3000);
      console.log("Username written in database");
    } catch (e) {
      showAlert(true)
      setAlertMsg('Error While Saving Name' + e.message)
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <div>
        <Navbar backBtn={'true'} loc={"Profile"} alert={alert} alertMsg={alertMsg} />
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

            <div className="input-div one">
              <div className="i">
                <CheckCircleOutline className={'mark ' + classActive}
                  onClick={() => {
                    if (name) {
                      addDataToFirestore(name);
                    } else {
                      showAlert(true)
                      setAlertMsg("Name Can't Be Empty !!!")
                    }
                    setClassActive('active');
                  }} />
              </div>
              <div className="div">
                <input type="text" value={name} onChange={(e) => {
                  setName(e.target.value)
                  showAlert(false)
                  setClassActive('')
                }} className="input" placeholder='<--Update || Enter Your Name' />
              </div>
            </div>

            <label id="label" htmlFor="file" > + UPLOAD PICTURE
              <input id="file" onChange={(e) => { upload(e.target) }} style={{ display: 'none' }} type="file" accept="image/*" />
            </label>
          </div>
        </div>



        <div className='admin_order_main_div'>
          <h1 style={{ color: 'blue' }}>Active Orders</h1>
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
              <select className='inp select_inp ' name="cars" id="cars">
                <option value="volvo" className="select_inp" >Change status</option>
                <option value="saab" className="select_inp" >Saab</option>
                <option value="mercedes" className="select_inp" >Mercedes</option>
                <option value="audi" className="select_inp" >Audi</option>
              </select>
            </div>
          </div>
        </div>
        <div className="signup_button_div" style={{ margin: '20px auto', textAlign: 'center' }}>
          <button className='get_Started_button' onClick={() => { signout() }} style={{ color: 'white' }}>Logout</button>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default AdminProfile
