import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  addDonation,
  deleteDonation,
  updateDonation,
  getDonations,
} from "../../firebase";

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
  const [editingId, setEditingId] = useState("");
  const [other, setOther] = useState("");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const data = await getDonations();
    setDonations(data);
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
      !contact
    ) {
      alert("Please fill all the fields!");
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
    if (editingId) {
      await updateDonation(editingId, donation);
      setEditingId("null");
    } else {
      await addDonation(donation);
    }
    setFoodTitle("");
    setCategory("");
    setQuantity("");
    setBestBefore("");
    setLocation("");
    setPickupTime("");
    setPickupDate("");
    setContact("");
  };

  const handleEdit = (donation) => {
    setFoodTitle(donation.foodTitle);
    setCategory(donation.category);
    setOther(donation.other || "");
    setQuantity(donation.quantity);
    setBestBefore(donation.bestBefore);
    setLocation(donation.location);
    setPickupDate(donation.pickup?.split(" ")[0] || "");
    setPickupTime(donation.pickup?.split(" ")[1] || "");
    setContact(donation.contact);
  };
  const handleDelete = async (id) => {
    try {
      await deleteDonation(id);
      fetchDonations();
    } catch (error) {}
  };

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
      <div className="max-w-lg justify-center shadow-lg bg-white mx-auto px-4 py-6 rounded-2xl">
        <h1 className="text-xl font-bold mb-4 text-center text-green-500">
          Help reduce waste and feed people in need
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="foodtitle" className="block font-medium">
            Food Title
          </label>
          <input
            id="foodtitle"
            type="text"
            className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
            value={foodTitle}
            onChange={(e) => setFoodTitle(e.target.value)}
          />

          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="none">Select</option>
            <option value="vegetables">Vegetables</option>
            <option value="cooked food">Cooked Food</option>
            <option value="Bread & Pastries">Bread & Pastries</option>
            <option value="Dairy products">Dairy Products</option>
            <option value="Grains & Cereals">Grains & Cereals</option>
            <option value="Meat">Meat</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="other" className="block font-medium" value={category}>
            If other, write a short description below
          </label>
          <textarea
            id="other"
            name="other"
            placeholder="Short Description"
            className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
            value={other}
            onChange={(e) => setOther(e.target.value)}
          />

          <label htmlFor="quantity" className="block font-medium">
            Quantity
          </label>
          <input
            id="quantity"
            type="text"
            placeholder="e.g. 10 plates, 50 items, 3kgs"
            className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <label htmlFor="bestBefore" className="block font-medium">
            Best Before
          </label>
          <input
            id="bestBefore"
            type="date"
            className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
            value={bestBefore}
            onChange={(e) => setBestBefore(e.target.value)}
          />

          <label htmlFor="location" className="block font-medium">
            Location
          </label>
          <input
            id="location"
            type="text"
            className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label htmlFor="pickupTime" className="block font-medium">
            Pick-up Times
          </label>

          <div className="flex gap-2">
            <input
              type="date"
              className="flex-1 px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />

            <input
              type="time"
              className="flex-1 px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="text-sm text-green-600 hover:underline"
            value={pickupTime}
            onSubmit={handleSubmit}
          >
            + Add another pick-up time
          </button>

          <label htmlFor="contact" className="block font-medium">
            Contact
          </label>
          <input
            id="contact"
            type="tel"
            className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <button
            type="submit"
            className="mt-4 w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
          >
            Post
          </button>
        </form>
      </div>
      <h1>Your Active Donations</h1>
      <ul>
        {donations.map((donation) => (
          <li key={donation.id}>
            {donation.foodTitle} | Category: {donation.category} | Quantity:{" "}
            {donation.quantity} | Contact: {donation.contact}
            <button onClick={() => handleEdit(donation)}>Edit</button>
            <button onClick={() => handleDelete(donation.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
}

export default UserDashboard;
