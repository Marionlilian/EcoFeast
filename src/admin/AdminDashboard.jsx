import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchDashboardData();
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const donationsSnapshot = await getDocs(collection(db, "donations"));

      const userList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const donationList = donationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userList);
      setDonations(donationList);

      const totalFood = donationList.length;
      const totalMeals = donationList.filter(d => d.status === "booked").length;

      setAnalytics({
        totalFoodSaved: totalFood,
        mealsDonated: totalMeals,
        donors: userList.filter(u => u.role === "donor").length,
        ngos: userList.filter(u => u.role === "ngo").length,
      });

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch admin data:", err.message);
      setLoading(false);
    }
  };

  const handleVerify = async (userId) => {
    try {
      await updateDoc(doc(db, "users", userId), { verified: true });
      fetchDashboardData();
    } catch (err) {
      alert("Verification failed: " + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-10">Loading admin dashboard...</p>;

  return (
    <div className="p-4">
      <Navbar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <div className="flex gap-4 mt-2">
          <div>Total Food Listings: {analytics.totalFoodSaved}</div>
          <div>Meals Donated: {analytics.mealsDonated}</div>
          <div>Donors: {analytics.donors}</div>
          <div>NGOs: {analytics.ngos}</div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">User Verification</h2>
        <ul className="space-y-2 mt-2">
          {users.filter(u => !u.verified).map(user => (
            <li key={user.id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>
              <button onClick={() => handleVerify(user.id)} className="bg-green-500 text-white px-4 py-2 rounded">Verify</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Recent Donations</h2>
        <ul className="space-y-2 mt-2">
          {donations.map(d => (
            <li key={d.id} className="border p-4 rounded">
              <p><strong>Item:</strong> {d.foodTitle || "Unnamed"}</p>
              <p><strong>Status:</strong> {d.status}</p>
              <p><strong>Donor:</strong> {d.donorId}</p>
              <p><strong>Booked By:</strong> {d.bookedBy || "N/A"}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
