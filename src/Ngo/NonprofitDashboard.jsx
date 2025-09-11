 import { signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase';
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
      <h1>NGO here</h1>

      <button onClick={handleLogout}>Logout</button>
    </div>
    

  )
}

export default NonprofitDashboard
