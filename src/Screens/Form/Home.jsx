import React, { useEffect, useState } from 'react'
import Logo from '../../Assets/Images/logo.png'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Home() {
  const [user , setUser] = useState('')
  const [admin , setAdmin] = useState('')
  const getUserFromDataBase = () => {
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {

      if (user) {
        setUser(true)
        user.email==='admin@gmail.com'?setAdmin(true):setAdmin(false);
        
      } else {
        setUser(false)
      }
    });
  }

    useEffect(() => {
      getUserFromDataBase();
    }, [""])
    

  return (
    <>
      <div className="getStarted_main_div">
        <div className="log_saylani_Store"><img src={Logo} alt="" /></div>
        <div className='saylaniWelfare_heading_div'>
          <h1>Saylani Welfare </h1>
          <p>ONLINE DISCOUNT STORE</p>
        </div>
        <div className="signup_button_div">
          <button className='get_Started_button'> {user?admin?<Link to='/admin/home'className='link'  > GET STARTED</Link>:<Link to='/user/home/page'className='link'  > GET STARTED</Link>:<Link to='/Login'className='link'  > GET STARTED</Link>} </button>
        </div>
      </div>
    </>  
  )

}

export default Home