import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

function AdminDashboard() {

  const navigate =useNavigate();
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
      <h1>This is Admin</h1>

      <button onClick={handleLogout} >Log Out</button>
    </div>
  )
}

export default AdminDashboard
