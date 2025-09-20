import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, getUserRole } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      // sign in user
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      //   await getUserRole(user.uid);      // get user document
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const role = docSnap.data().role;

        if (role === "ngo") {
          navigate("/Ngo/NonprofitDashboard");
        } else if (role === "donor") {
          navigate("/userdash/UserDashboard");
        } else if (role === "admin") {
          navigate("/admin/AdminDashboard");
        } else {
          alert("Role not assigned. Contact admin.");
        }
      } else {
        alert("No user data found!");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="px-2 py-2 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="relative h-[32rem] w-full flex items-center justify-center text-center text-white px-12 py-4">
          <img
            src="/happykid.jpg"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-500/50"></div>

          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold">
              Don't Have an Account?
            </h1>
            <p className="mt-2 mb-8 text-lg">Join the Family with one click</p>{" "}
            <br />
            <a
              href="/Register"
              className="mt-2 px-6 py-2 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              Register
            </a>
          </div>
        </div>

        <div className="max-w-xl mx-16 px-8 py-12 bg-white rounded-lg shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            LOG IN{" "}
          </h1>

          <div className="justify-center">
            <h1 className="text-lg text-center font-extrabold bg-gradient-to-r from-purple-500 via-green-400 to-blue-500 bg-clip-text text-transparent">
              FEED KENYA
            </h1> <br />

            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
        
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <br /> <br />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <br /> <br />
            <button onClick={handleLogin}
             className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition">
              Log In
              </button>
            <p>
              
              
            </p>
          </div>
        </div>

        
      </div>
      <Footer />
    </div>
  );
}
export default Login;
