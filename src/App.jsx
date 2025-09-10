import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import { getAuth, signOut } from 'firebase/auth'
import { auth } from '../firebase';

function App() {
const [registerEmail, setRegisterEmail]=useState('');
const [registerPassword, setRegisterPassword]=useState('')

const [loginEmail, setLoginEmail]=useState('');
const [loginPassword, setLoginPassword]=useState('')

const [user, setUser]= useState({})


onAuthStateChanged (auth, (currentUser)=>{
  setUser(currentUser)
})



  const register = async()=>{
    try {
      const user = await createUserWithEmailAndPassword (auth, registerEmail, registerPassword);
      console.log (user);
     
    } catch (error) {
      console.log (error.message)
      
      
    } 

  }
  const login = async()=>{
    try {
      const user = await signInWithEmailAndPassword (auth, loginEmail, loginPassword )
      
    } catch (error) {
      console.log(error.message)
      
    }

  }
const logout= ()=>{
  signOut(auth)

}
  return (
    <>
     <BrowserRouter>
  <Routes>
    <Route  path='' />
  </Routes>
  
  
  </BrowserRouter>

  <div>
    <h1>NGO Register</h1>
    <input type="text" onChange={(event) =>{
      setRegisterEmail(event.target.value)
    }} />Username 
    <input type="password" onChange={(event) =>{
      setRegisterPassword(event.target.value)
    }} />Password 
    <button onClick={register}>Register</button>
  </div>
  <div>
    <h1>
      NGO Login
    </h1>
    <input type="text" onChange={(event) =>{
      setLoginEmail(event.target.value)
    }} />Username 
    <input type="password" onChange={(event) =>{
      setLoginPassword(event.target.value)
    }}  />Password
    <button onClick={login}>Login</button>
  </div>
  <div>
    <h1>User Logged In</h1> {user?.email}
  </div>

  <div>
    <button onClick={logout}>Log Out</button>
  </div>


      
    </>
  )
}

export default App
