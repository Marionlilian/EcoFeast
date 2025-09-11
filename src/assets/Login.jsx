import { useEffect, useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import { getAuth, signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'

function Login() {
const [registerEmail, setRegisterEmail]=useState('');
const [registerPassword, setRegisterPassword]=useState('')

const [loginEmail, setLoginEmail]=useState('');
const [loginPassword, setLoginPassword]=useState('')

const [user, setUser]= useState({})
const [userRole, setUserRole]=useState('')

const userCollectionRef = collection(db, 'user');

const navigate= useNavigate();

useEffect(() => {
  const getUsers = async () => {
    const data = await getDocs(collection(db, "users")); 
    console.log(data.docs.map(doc => doc.data()));
  };

  getUsers();
}, []);



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

  <div>
    <h1>SIGN UP</h1>
    <label htmlFor="role">Sign Up As:</label>
    <select name="role" id="role" value={userRole} onChange={(e)=>setUserRole(e.target.value)}>
        <option value="disabled">Select</option>
        <option value="Admin">Admin</option>
        <option value="NGO">NGO</option>
        <option value="User">User</option>
    </select>
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
      LOG IN
    </h1>
     <label htmlFor="role">Account Type:</label>
    <select name="role" id="role">
        <option value="select">Select</option>
        <option value="Admin">Admin</option>
        <option value="NGO">NGO</option>
        <option value="User">User</option>
    </select>
   
    <input 
    type="text" 
    onChange={(event) =>{
      setLoginEmail(event.target.value)
    }} />

    <input 
    type="password" 
    onChange={(event) =>{
      setLoginPassword(event.target.value)
    }}  />

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

export default Login
