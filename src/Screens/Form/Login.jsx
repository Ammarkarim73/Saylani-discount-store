import { useState } from "react"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WifiCallingIcon from '@mui/icons-material/WifiCalling';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link,useNavigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { async } from "q";
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const db = getFirestore()
  const navigate = useNavigate()

  const LoginForm = () => {
    if(email == 'admin@gmail.com'){
      navigate('/admin/home')
    }else{
      navigate('/user/home/page')
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // console.log(user)
        if (!user.emailVerified) {
          // console.log("Document data:", docSnap.data());
          // dispatch(LoginUserData(docSnap.data()))
          sendEmailVerification(auth.currentUser)
                    .then(() => {
              alert('VERIFICATION SENT SUCCESSFULLY TO YOUR GMAIL ACCOUNT .. !')
        })
        .catch((err) => console.log(err));
                alert( "SignUp success");
        } else {
          navigate('/user/home/page')
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
            <MarkunreadIcon className='form_icon' />
          </div>
          <div className="div">
            <input required type="Email" className="input" placeholder=' Enter Email'
              value={email} onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
        </div>

        <div className="input-div one">
          <div className="i">
            <VisibilityOffIcon className='form_icon' />
          </div>
          <div className="div">
            <input required type="password" className="input" placeholder='Enter Password'
              value={password} onChange={(e) => {
                setPassword(e.target.value)
              }}

            />
          </div>
        </div>
        <div className="get_Started_button_div">
          <button className='get_Started_button' onClick={LoginForm}> <Link className='link'  > Sign In</Link></button>
          <p className="already_account"> <Link to='/register' className='link_login' >Don't Have an account? Register</Link> </p></div>

      </div>
    </>
  )
}
export default Login
