 import { signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase';
import Navbar from "../components/Navbar";
function NonprofitDashboard() {
    const navigate = useNavigate();

    const handleLogout=async ()=>{
        try {
            await signOut(auth);
            navigate ('/login');

            
        } catch (error) {
            alert('Logout Failed:'+ error.message);
        }
    }

  return (
    <div>
      <Navbar/>
      <div>
         <h1>NGO here</h1>

      <button onClick={handleLogout} 
      className='px-2 py-2 text-white text-lg rounded right-0 bg-red-300'
      >Logout</button>

      </div>
    </div>
    

  )
}

export default NonprofitDashboard
