import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, setUserRole } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      await setUserRole(res.user.uid, role);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="px-2 py-2 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="max-w-xl mx-16 px-8 py-6 bg-white rounded-lg shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            CREATE ACCOUNT
          </h1>

          <div className="flex justify-center">
             <h1 className="text-lg font-extrabold bg-gradient-to-r from-purple-500 via-green-400 to-blue-500 bg-clip-text text-transparent">
                FEED KENYA
              </h1>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Option</option>
              <option value="ngo">NGO</option>
              <option value="donor">Donor</option>
            </select>
          </div>

          <button
            onClick={handleSignUp}
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>
        <div className="relative h-[32rem] w-full flex items-center justify-center text-center text-white px-12 py-4">
          <img
            src="/happykid.jpg"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-500/50"></div>

          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold">
              Already a Member?
            </h1>
            <p className="mt-2 mb-8 text-lg">Log in with Email & Password</p> <br />
            <a href="/Login" className="mt-2 px-6 py-2 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
              LOG IN
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Register;
