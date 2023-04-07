import React from 'react'
import Logo from '../../Assets/Images/logo.png'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div className="getStarted_main_div">
        <div className="log_saylani_Store"><img src={Logo} alt="" /></div>
        <div className='saylaniWelfare_heading_div'>
          <h1>Saylani Welfare </h1>
          <p>ONLINE DISCOUNT STORE</p>
        </div>
        <div className="signup_button_div">
          <button className='get_Started_button'> <Link to='/Login'className='link'  > GET STARTED</Link> </button>
        </div>
      </div>
    </>  
  )

}

export default Home