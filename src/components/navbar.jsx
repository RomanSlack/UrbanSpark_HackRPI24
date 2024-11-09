// src/components/Navbar.js
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div>
      <div className="w-full bg-white bg-opacity-30 backdrop-blur-md shadow-md py-2 px-4 top-0 flex justify-between items-center z-50">
        <div className="flex items-center space-x-4">
          
          <Link to="/" className="text-xl font-semibold text-red-500"> {/* Smaller text for logo */}
            HackRPI
          </Link>
        </div>
        <div className="hidden md:flex space-x-4"> {/* Reduced space between links */}
          
        </div>
      </div>
    </div>
  );
}
