// src/components/Navbar.js
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div>
      <div className="w-full bg-white bg-opacity-30 backdrop-blur-md shadow-md py-2 px-4 top-0 flex justify-between items-center z-50 overflow-hidden">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-semibold text-red-500">
            CitySync
          </Link>
          {/* <Link to="/AiTest" className="text-xl font-semibold text-red-500">
            Ai Test
          </Link> */}
        </div>
        <div className="hidden md:flex space-x-4">
          {/* Additional links could go here */}
        </div>
      </div>
    </div>
  );
}
