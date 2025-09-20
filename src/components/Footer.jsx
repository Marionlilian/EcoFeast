import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="text-gray-600 body-font bg-gray-100 mt-10">
      <div className="container mx-auto px-5 py-6 flex flex-col sm:flex-row items-center">
        <h1 className="text-xl font-extrabold bg-gradient-to-r from-purple-500 via-green-400 to-blue-500 bg-clip-text text-transparent">
                FEED KENYA
              </h1>

        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()} MarionLilian —
          <a
            href="https://twitter.com/marion_lilian9"
            className="text-gray-600 ml-1 hover:text-purple-500"
            rel="noopener noreferrer"
            target="_blank"
          >
            All rights reserved
          </a>
        </p>

        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a href="https://www.facebook.com/likhi.immer/" className="text-gray-500 hover:text-purple-500">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              
            </svg>
          </a>

          

          <a href="https://www.instagram.com/marion_lilian9/" className="ml-3 text-gray-500 hover:text-purple-500">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <circle cx="18.5" cy="5.5" r="1.5" />
            </svg>
          </a>

          <a href="https://www.linkedin.com/in/writer-lilian/" className="ml-3 text-gray-500 hover:text-purple-500">
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              />
              <circle cx="4" cy="4" r="2" stroke="none" />
            </svg>
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
