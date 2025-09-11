import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import { getAuth, signOut } from 'firebase/auth'
import { auth } from '../firebase';
import Login from './assets/Login'
import AdminDashboard from './admin/AdminDashboard'
import NgoDashboard from './Ngo/NgoDashboard'
import UserDashboard from './userdash/UserDashboard'
import Home from './Home'

function App() {

  return (
    <>
     
     <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route path= './assets/Login' element={<Login/>}/>
    <Route path= './admin/AdminDashboard' element={<AdminDashboard/>}/>
    <Route path='./userdash/UserDashboard' element={<UserDashboard/>}/>
    <Route path= './Ngo/NgoDashboard' element={<NgoDashboard/>}/>
  </Routes>
  <Home/>
  <Login/>
  <AdminDashboard/>
  <NgoDashboard/>
  <UserDashboard/>
 

    </>
  )
}

export default App
