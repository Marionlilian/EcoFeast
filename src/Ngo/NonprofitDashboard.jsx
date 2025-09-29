import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import Navbar from "../components/Navbar";

import {
  getAvailableDonations,
  getNGOBookings,
  getMessages,
  sendMessage,
  getNGOStats,
  bookDonation,
  cancelBooking,
} from "../../firebase/firebasehelpers";

const NonprofitDashboard = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({});
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
        fetchDashboardData().finally(() => setLoading(false));
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [donationList, bookingList, messageList, stat] = await Promise.all([
        getAvailableDonations(),
        getNGOBookings(),
        getMessages(),
        getNGOStats(),
      ]);
      setDonations(donationList);
      setBookings(bookingList);
      setMessages(messageList);
      setStats(stat);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  const handleBook = async (donationId) => {
    try {
      await bookDonation(donationId);
      fetchDashboardData();
    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  };

  const handleCancel = async (donationId) => {
    try {
      await cancelBooking(donationId);
      fetchDashboardData();
    } catch (error) {
      alert("Cancel failed: " + error.message);
    }
  };

  const handleSendMessage = async (recipientId, donationId) => {
    if (!messageText.trim()) return;

    try {
      await sendMessage(recipientId, donationId, messageText);
      setMessageText("");
      fetchDashboardData();
    } catch (error) {
      alert("Message failed: " + error.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading dashboard...</p>;
  }

  return (
    <div className="p-4">
      <Navbar />

      <div className="flex justify-between items-center mt-4">
        <h1 className="text-2xl font-bold">Nonprofit Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Your Stats</h2>
        <div className="flex gap-6">
          <div>Total Bookings: {stats.totalBookings || 0}</div>
          <div>Expiring Today: {stats.expiringToday || 0}</div>
          <div>Expiring Tomorrow: {stats.expiringTomorrow || 0}</div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Available Donations</h2>
        {donations.length === 0 ? (
          <p>No available donations at the moment.</p>
        ) : (
          <ul className="space-y-2">
            {donations.map((donation) => (
              <li
                key={donation.id}
                className="p-4 border rounded flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Item:</strong> {donation.foodTitle || "Unknown"}
                  </p>
                  <p>
                    <strong>Best Before:</strong>{" "}
                    {donation.bestBefore?.toDate
                      ? donation.bestBefore.toDate().toDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Pickup:</strong> {donation.pickup || "N/A"}
                  </p>
                </div>
                <button
                  onClick={() => handleBook(donation.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Book
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p>No current bookings</p>
        ) : (
          <ul className="space-y-2">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="p-4 border rounded flex justify-between items-center"
              >
                <div>
                  <p><strong>Item:</strong> {booking.foodTitle || "Unknown"}</p>
                  <p>
                    <strong>Best Before:</strong>{" "}
                    {booking.bestBefore?.toDate
                      ? booking.bestBefore.toDate().toDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Pickup:</strong> {booking.pickup}
                  </p>
                </div>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Messages</h2>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((msg) => (
              <li key={msg.id} className="p-4 border rounded">
                <p>
                  <strong>{msg.type === "sent" ? "To" : "From"}:</strong>{" "}
                  {msg.type === "sent" ? msg.recipientId : msg.senderId}
                </p>
                <p>
                  <strong>Message:</strong> {msg.message}
                </p>
                <p className="text-sm text-gray-500">
                  {msg.timestamp?.toDate
                    ? msg.timestamp.toDate().toLocaleString()
                    : ""}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Enter your message..."
            className="border px-3 py-2 w-2/3 mr-2"
          />
          <button
            onClick={() => handleSendMessage("donorID123", "donationID123")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default NonprofitDashboard;
