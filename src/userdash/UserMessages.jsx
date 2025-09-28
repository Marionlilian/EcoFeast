import React from "react";
import Navbar from "../components/Navbar";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MessageNav from "./MessageNav";
import {  HiUser } from "react-icons/hi";
function UserMessages() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Logout Failed:" + error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-between px-4 py-6 bg-green-500 text-white text-xl font-bold gap-4">
        <div className="flex gap-4">
          <Link
            to="/userdash/UserDashboard"
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Share Food
          </Link>
          <Link
            to="/userdash/UserMessages"
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Messages
          </Link>
          <Link
            to="/userdash/UserHistory"
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Past Donations
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </div>

     <div className="grid grid-cols-1 md:grid-cols-4 mx-auto mb-0 bottom-0 my-4 max-w-6xl shadow-lg rounded-lg bottom-0">
  <div className="hidden md:block col-span-1">
    <MessageNav />
  </div>
  <div className="col-span-3 bg-gray-300">
    <div className="chat-nav flex shadow-lg mx-4 my-2 bg-green-700 px-4 py-3 justify-between">  
      <img src={"/happykid.jpg"} alt=""
      className="h-10 w-10 rounded-full"
      />
      <p>User 1</p>
      
      

    </div>

    <div className="bottom-0 mb-0 right-0 mx-2 my-2">
      <input type="text" 
      className="px-2 py-2 w-1/2 border border-gree-500 rounded-lg"
      placeholder="Your Message ..."
      />
      <button
      className="mx-2 my-2 bg-green-500 px-2 py-2 rounded text-white text-lg hover:bg-green-900">
        Send
         
      </button>
    </div>
    
  </div>
</div>

     
    </div>
  );
}

export default UserMessages;
