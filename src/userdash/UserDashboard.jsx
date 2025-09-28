import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  addDonation,
  deleteDonation,
  updateDonation,
  getDonations,
} from "../../firebase/firebase";

function UserDashboard() {
  const [donations, setDonations] = useState([]);
  const [foodTitle, setFoodTitle] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [bestBefore, setBestBefore] = useState("");
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [contact, setContact] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [other, setOther] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const data = await getDonations();
    setDonations(data);
  };

  const resetForm = () => {
    setFoodTitle("");
    setCategory("");
    setQuantity("");
    setBestBefore("");
    setLocation("");
    setPickupDate("");
    setPickupTime("");
    setContact("");
    setEditingId(null);
    setOther("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !foodTitle ||
      !category ||
      !quantity ||
      !bestBefore ||
      !location ||
      !pickupTime ||
      !pickupDate ||
      !contact
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const donation = {
      foodTitle,
      category: category === "Other" ? other : category,
      quantity,
      bestBefore: new Date(bestBefore),
      location,
      pickup: `${pickupDate} ${pickupTime}`,
      contact,
    };

    try {
      if (editingId) {
        await updateDonation(editingId, donation);
      } else {
        await addDonation(donation);
      }
      fetchDonations();
      resetForm();
    } catch (error) {
      alert("Error posting donation: " + error.message);
    }
  };

  const handleEdit = (donation) => {
    setEditingId(donation.id);
    setFoodTitle(donation.foodTitle);
    setCategory(donation.category);
    setQuantity(donation.quantity);
    setBestBefore(
      donation.bestBefore?.toDate
        ? donation.bestBefore.toDate().toISOString().split("T")[0]
        : donation.bestBefore
    );
    setLocation(donation.location);
    setPickupDate(donation.pickup?.split(" ")[0] || "");
    setPickupTime(donation.pickup?.split(" ")[1] || "");
    setContact(donation.contact);
    setOther(donation.category === "Other" ? donation.other || "" : "");
  };

  const handleDelete = async (id) => {
    try {
      await deleteDonation(id);
      fetchDonations();
    } catch (error) {
      alert("Failed to delete: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Logout Failed: " + error.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-between px-4 py-6 bg-green-500 text-white text-xl font-bold gap-4">
        <div className="flex gap-4">
          <Link
            to="/userdash/UserDashboard"
            className="py-2 px-4 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Share Food
          </Link>
          <Link
            to="/userdash/UserMessages"
            className="py-2 px-4 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Messages
          </Link>
          <Link
            to="/userdash/UserHistory"
            className="py-2 px-4 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Past Donations
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="max-w-lg mx-auto px-4 py-6 shadow-lg bg-white rounded-2xl">
          <h1 className="text-xl font-bold mb-4 text-center text-green-500">
            Help reduce waste and feed people in need
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block font-medium">Food Title</label>
            <input
              type="text"
              className="w-full px-2 py-2 border bg-gray-100 rounded-md"
              value={foodTitle}
              onChange={(e) => setFoodTitle(e.target.value)}
            />

            <label className="block font-medium">Category</label>
            <select
              className="w-full px-2 py-2 border bg-gray-100 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Cooked Food">Cooked Food</option>
              <option value="Bread & Pastries">Bread & Pastries</option>
              <option value="Dairy Products">Dairy Products</option>
              <option value="Grains & Cereals">Grains & Cereals</option>
              <option value="Meat">Meat</option>
              <option value="Other">Other</option>
            </select>

            {category === "Other" && (
              <>
                <label className="block font-medium">Other Category</label>
                <textarea
                  placeholder="Short Description"
                  className="w-full px-2 py-2 border bg-gray-100 rounded-md"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              </>
            )}

            <label className="block font-medium">Quantity</label>
            <input
              type="text"
              placeholder="e.g. 10 plates, 3 kgs"
              className="w-full px-2 py-2 border bg-gray-100 rounded-md"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <label className="block font-medium">Best Before</label>
            <input
              type="date"
              className="w-full px-2 py-2 border bg-gray-100 rounded-md"
              value={bestBefore}
              onChange={(e) => setBestBefore(e.target.value)}
            />

            <label className="block font-medium">Location</label>
            <input
              type="text"
              className="w-full px-2 py-2 border bg-gray-100 rounded-md"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <label className="block font-medium">Pick-up Date & Time</label>
            <div className="flex gap-2">
              <input
                type="date"
                className="flex-1 px-2 py-2 border bg-gray-100 rounded-md"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
              <input
                type="time"
                className="flex-1 px-2 py-2 border bg-gray-100 rounded-md"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>

            <label className="block font-medium">Contact</label>
            <input
              type="tel"
              className="w-full px-2 py-2 border bg-gray-100 rounded-md"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />

            <button
              type="submit"
              className="mt-4 w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              {editingId ? "Update Donation" : "Post Donation"}
            </button>
          </form>
        </div>

        <div className="mx-4">
          <h1 className="text-xl font-bold text-center mt-6 mb-4">
            Your Active Donations
          </h1>

          <div className="space-y-4 max-w-2xl mx-auto">
            {donations.length === 0 ? (
              <p className="text-center text-gray-500">
                No active donations yet.
              </p>
            ) : (
              donations.map((donation) => (
                <div
                  key={donation.id}
                  className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-semibold text-green-600">
                      {donation.foodTitle}
                    </h2>
                    <p className="text-sm">Category: {donation.category}</p>
                    <p className="text-sm">Quantity: {donation.quantity}</p>
                    <p className="text-sm">Location: {donation.location}</p>
                    <p className="text-sm">Pickup: {donation.pickup}</p>
                    <p className="text-sm">
                      Best Before:{" "}
                      {donation.bestBefore?.toDate
                        ? donation.bestBefore.toDate().toLocaleDateString()
                        : donation.bestBefore}
                    </p>
                    <p className="text-sm">Contact: {donation.contact}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(donation)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(donation.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserDashboard;
