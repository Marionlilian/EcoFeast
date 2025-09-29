import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

function UserDashboard() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Logout Failed:" + error.message);
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(collection(db, "donations"), where("postedBy", "==", user.uid));
        const snapshot = await getDocs(q);

        const data = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const donation = { id: docSnap.id, ...docSnap.data() };

            if (donation.bookedBy) {
              const ngoDoc = await getDoc(doc(db, "users", donation.bookedBy));
              donation.bookedByEmail = ngoDoc.exists() ? ngoDoc.data().email : "Unknown NGO";
            }

            return donation;
          })
        );

        setDonations(data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

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
            Donation Status
          </Link>
          
        </div>

        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </div>

      <div className="max-w-6xl mx-auto my-6 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">My Donations</h2>

        {loading ? (
          <p>Loading donations...</p>
        ) : donations.length === 0 ? (
          <p>You have not posted any donations yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <h3 className="text-lg font-semibold">{donation.foodName}</h3>
                <p className="text-sm text-gray-600">
                  Quantity: {donation.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span
                    className={
                      donation.status === "booked"
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }
                  >
                    {donation.status}
                  </span>
                </p>

                {donation.status === "booked" && (
                  <>
                    <p className="text-sm text-blue-700 mt-1">
                      Booked by: {donation.bookedByEmail || "Unknown NGO"}
                    </p>
                    <Link
                      to={`/userdash/UserMessages?recipient=${donation.bookedBy}&donation=${donation.id}`}
                      className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Message NGO
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
