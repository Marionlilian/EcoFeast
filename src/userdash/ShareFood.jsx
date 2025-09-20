import React from 'react'

const ShareFood = () => {
  return (
    <div>
      <button onClick={handleLogout} 
      className="w-full py-4 px-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
      >
        Log Out
        </button>

        <div className="max-w-lg justify-center shadow-lg bg-white mx-auto px-4 py-6 rounded-2xl">
  <h1 className="text-xl font-bold mb-4 text-center text-green-500">Help reduce waste and feed people in need</h1>
  <form className="space-y-4">

    <label htmlFor="foodtitle" className="block font-medium">Food Title</label>
    <input 
      id="foodtitle"
      type="text"
      className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
    />

    <label htmlFor="category" className="block font-medium">Category</label>
    <select 
      id="category" 
      name="category"
      className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
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

    <label htmlFor="other" className="block font-medium">
      If other, write a short description below
    </label>
    <textarea 
      id="other" 
      name="other" 
      placeholder="Short Description"
      className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
    />

    <label htmlFor="quantity" className="block font-medium">Quantity</label>
    <input 
      id="quantity"
      type="text" 
      placeholder="e.g. 10 plates, 50 items, 3kgs" 
      className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
    />

    <label htmlFor="bestBefore" className="block font-medium">Best Before</label>
    <input 
      id="bestBefore"
      type="date" 
      className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
    />

    <label htmlFor="location" className="block font-medium">Location</label>
    <input 
      id="location"
      type="text" 
      className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
    />

    <label htmlFor="pickupTime" className="block font-medium">Pick-up Times</label>
    <div className="flex gap-2">
      <input type="date" className="flex-1 px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500" />
      <input type="time" className="flex-1 px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500" />
    </div>
    <button type="button" className="text-sm text-green-600 hover:underline">
      + Add another pick-up time
    </button>

    <label htmlFor="contact" className="block font-medium">Contact</label>
    <input 
      id="contact"
      type="tel" 
      className="w-full px-2 py-2 border border-gray-500 bg-gray-100 rounded-md focus:border-green-500"
    />

    <button
      type="submit"
      className="mt-4 w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
    >
      Post
    </button>
  </form>
</div>



    </div>
  )
}

export default ShareFood
