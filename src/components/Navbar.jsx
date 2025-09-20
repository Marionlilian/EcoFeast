import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 via-green-400 to-blue-500 bg-clip-text text-transparent">
                FEED KENYA
              </h1>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-300 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:underline">
              Home
            </Link>
            <Link to="/Register" className="text-gray-700 dark:text-gray-300 hover:underline">
              Register
            </Link>
            <Link to="/Login" className="text-gray-700 dark:text-gray-300 hover:underline">
              Login
            </Link>
            <Link to="/Contact" className="text-gray-700 dark:text-gray-300 hover:underline">
              Contact
            </Link>
             
          </div>
        </div>
      </div>

   
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 dark:text-gray-300 hover:underline">
            Home
          </Link>
          <Link to="/About" className="block text-gray-700 dark:text-gray-300 hover:underline">
            About
          </Link>
          <Link to="/Projects" className="block text-gray-700 dark:text-gray-300 hover:underline">
            Projects
          </Link>
          <Link to="/Contact" className="block text-gray-700 dark:text-gray-300 hover:underline">
            Contact
          </Link>
           
        </div>
      )}
    </nav>
  );
};

export default Navbar;
