import { useState } from "react"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WifiCallingIcon from '@mui/icons-material/WifiCalling';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom'
import { db, auth } from '../../Firebase/firebase';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    // const [value, setValue] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState()
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const Register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const id = user.uid
                await setDoc(doc(db, 'users', user.uid), {
                    name: name,
                    email: email,
                    password: password,
                    number: number,
                    id: id
                });
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        alert('VERIFICATION SENT SUCCESSFULLY TO YOUR GMAIL ACCOUNT .. !')
                        navigate('/login')
                    })
                    .catch((err) => console.log(err));
                alert("SignUp success");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
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
                        <AccountCircleIcon className='form_icon' />
                    </div>
                    <div className="div">
                        <input type="text" required className="input" placeholder='Enter Your Name'
                            value={name} onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="input-div one">
                    <div className="i">
                        <WifiCallingIcon className='form_icon' />
                    </div>
                    <div className="div">
                        <input  required type="Number" className="input" placeholder='Enter Your Number'
                            value={number} onChange={(e) => {
                                setNumber(e.target.value)
                            }}

                        />
                    </div>
                </div>

                <div className="input-div one">
                    <div className="i">
                        <MarkunreadIcon className='form_icon' />
                    </div>
                    <div className="div">
                        <input type="Email" required className="input" placeholder='Enter Your Email'
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
                        <input type="Password" required className="input" placeholder='Enter Your Password'
                            value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }}

                        />
                    </div>
                </div>
                <div className="get_Started_button_div">
                    <button className='get_Started_button' onClick={Register}> Sign Up</button>
                    <p className="already_account"> <Link to='/login' className='link_login' >Already Have an account? Login</Link> </p></div>

            </div>
        </>
    )
}

export default SignUp
