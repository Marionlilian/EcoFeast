import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
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
      <Navbar/>
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
    </div>
  )
}

export default UserMessages
