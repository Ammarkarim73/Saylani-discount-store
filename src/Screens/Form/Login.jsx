import { useState, useEffect } from "react"

import MarkunreadIcon from '@mui/icons-material/Markunread';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link,useNavigate } from 'react-router-dom'
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [classActive, setClassActive] = useState('')
  const navigate = useNavigate()

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


useEffect(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, async(user) => {
    if (user) {
      const docRef = doc(db, "Redirect", "data");
      const docSnap = await getDoc(docRef);
      if(user.email === docSnap.data().email){
                navigate('/admin/home')
              }else{
                  navigate('/user/home')
                }
    } else {
      // User is signed out
      // ...
    }
  });
})


  
  

  const LoginForm = () => {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "Redirect", "data");
        const docSnap = await getDoc(docRef);
        if(user.email === docSnap.data().email){
          Toast.fire({
            icon: 'success',
            title: 'Loged In Successfully..!'
          });
          navigate('/admin/home')
        }else{
          Toast.fire({
            icon: 'success',
            title: 'Loged In Successfully..!'
          });
            navigate('/user/home')
          }
        
      })
      .catch((error) => {
        alert(error.message)
      });


      


  }
  return (
    <>
      <div className="Signup_form">
        <div className="Signup_form_heading">
          <h1>SAYLANI WELFARE</h1>
          <p>ONLINE DISCOUNT STORE</p>
        </div>

        <div className="input-div one">
          <div className="i">
            <MarkunreadIcon className={`form_icon ${classActive==='email'? 'active':''}`} />
          </div>
          <div className="div">
            <input required type="Email" className="input" onFocus={()=>{setClassActive('email')}} onBlur={()=>{setClassActive('')}} placeholder=' Enter Email'
              value={email} onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
        </div>

        <div className="input-div one">
          <div className="i">
            <VisibilityOffIcon className={`form_icon ${classActive==='password'? 'active':''}`} />
          </div>
          <div className="div">
            <input required type="password" className="input" onFocus={()=>{setClassActive('password')}} onBlur={()=>{setClassActive('')}} placeholder='Enter Password'
              value={password} onChange={(e) => {
                setPassword(e.target.value)
              }}

            />
          </div>
        </div>
        <div className="get_Started_button_div">
          <button className='get_Started_button' onClick={LoginForm}>Sign In</button>
          <p className="already_account"> Don't Have an account? <Link to='/register' className='link_login' >Register</Link> </p></div>

      </div>
    </>
  )
}
export default Login
