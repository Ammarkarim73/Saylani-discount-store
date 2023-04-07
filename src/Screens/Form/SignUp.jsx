import { useState } from "react"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WifiCallingIcon from '@mui/icons-material/WifiCalling';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState()
    const [password, setPassword] = useState('')
    const [classActive, setClassActive] = useState('')
    const navigate = useNavigate()
    const auth = getAuth()
    const Register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const id = user.uid
                alert("SignUp success");
                    navigate('/login');
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
                        <AccountCircleIcon className={`form_icon ${classActive==='name'? 'active':''}`} />
                    </div>
                    <div className="div">
                        <input type="text" required className="input" onFocus={()=>{setClassActive('name')}} onBlur={()=>{setClassActive('')}} placeholder='Enter Your Name'
                            value={name} onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="input-div one">
                    <div className="i">
                        <WifiCallingIcon className={`form_icon ${classActive==='number'? 'active':''}`} />
                    </div>
                    <div className="div">
                        <input  required type="Number" className="input" onFocus={()=>{setClassActive('number')}} onBlur={()=>{setClassActive('')}} placeholder='Enter Your Number'
                            value={number} onChange={(e) => {
                                setNumber(e.target.value)
                            }}

                        />
                    </div>
                </div>

                <div className="input-div one">
                    <div className="i">
                        <MarkunreadIcon className={`form_icon ${classActive==='email'? 'active':''}`} />
                    </div>
                    <div className="div">
                        <input type="Email" required className="input" onFocus={()=>{setClassActive('email')}} onBlur={()=>{setClassActive('')}} placeholder='Enter Your Email'
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
                        <input id="password" type="Password" required className="input" onFocus={()=>{setClassActive('password')}} onBlur={()=>{setClassActive('')}} placeholder='Enter Your Password'
                            value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }}

                        />
                    </div>
                </div>
                <div className="get_Started_button_div">
                    <button className='get_Started_button' onClick={Register}> Sign Up</button>
                    <p className="already_account"> Already Have an account? <Link to='/login' className='link_login' >Login</Link> </p></div>

            </div>
        </>
    )
}

export default SignUp
