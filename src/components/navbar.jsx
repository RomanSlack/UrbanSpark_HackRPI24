// src/components/Navbar.js
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="w-full bg-white bg-opacity-30 backdrop-blur-md shadow-md py-2 px-4 fixed top-0 flex justify-between items-center z-50">
      <div className="flex items-center space-x-4">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5" // Slightly smaller icon size
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white bg-opacity-90 backdrop-blur-lg rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" className="text-gray-700 hover:text-red-500 transition duration-300">Homepage</Link>
            </li>
            <li>
              <Link to="/learn" className="text-gray-700 hover:text-red-500 transition duration-300">Learn</Link>
            </li>
            <li>
              <Link to="/support" className="text-gray-700 hover:text-red-500 transition duration-300">Support</Link>
            </li>
            <li>
              <Link to="/ai-test" className="text-gray-700 hover:text-red-500 transition duration-300">AI Test</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="text-xl font-semibold text-red-500"> {/* Smaller text for logo */}
          HackRPI
        </Link>
      </div>
      <div className="hidden md:flex space-x-4"> {/* Reduced space between links */}
        <Link to="/" className="text-gray-800 hover:text-red-500 transition duration-300">Home</Link>
        <Link to="/learn" className="text-gray-800 hover:text-red-500 transition duration-300">Learn</Link>
        <Link to="/support" className="text-gray-800 hover:text-red-500 transition duration-300">Support</Link>
        <Link to="/ai-test" className="text-gray-800 hover:text-red-500 transition duration-300">AI Test</Link>
      </div>
    </div>
  );
}
