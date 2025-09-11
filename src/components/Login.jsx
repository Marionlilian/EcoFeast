import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, getUserRole } from '../../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  const handleLogin = async () => {
    try {
      // sign in user
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
    //   await getUserRole(user.uid);      // get user document
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);      
      if (docSnap.exists()) {
        const role = docSnap.data().role;    
            
        if (role === 'ngo') {
  navigate('/Ngo/NonprofitDashboard');
} else if (role === 'donor') {
  navigate('/userdash/UserDashboard');
} else if (role === 'admin') {
  navigate('/admin/AdminDashboard');
} else {
          alert("Role not assigned. Contact admin.");
        }
      } else {
        alert("No user data found!");
      }    } catch (error) {
      alert(error.message);
    }
  };  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />      <button onClick={handleLogin}>Log In</button>
      <p> <Link to= '/register'> Register Here</Link></p>
    </div>
  );
}export default Login;
