import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
function UserDashboard() {
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
      <h1>Users</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default UserDashboard
