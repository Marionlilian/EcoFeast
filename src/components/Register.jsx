import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth, setUserRole } from "../../firebase";
import { useNavigate } from "react-router-dom";function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();    
    const handleSignUp = async()=>{
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            setUser(res.user);
            await setUserRole(res.user.uid, role);
            navigate("/login")        }catch(error){
            alert(error.message);
        }    }
  return (
    <div>
        <div>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />            <select name="role" id="role" value={role} onChange={(e)=>setRole(e.target.value)}>
                <option value="">Select Option</option>
                <option value="ngo">NGO</option>
                <option value="donor">Donor</option>
                
            </select>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>    </div>
  )
}export default Register
