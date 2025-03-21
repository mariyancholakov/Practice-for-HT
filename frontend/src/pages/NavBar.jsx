import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Home, Plus, Users, User } from "lucide-react";
import AuthContext from "../context/authContext";
import { Button } from "@mui/material";

const Sidebar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
  };
  console.log("User: ", user);

  return (
    // <div className="min-h-screen bg-black">
    <div className="flex bg-black shadow-none">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-bluelight flex flex-col items-center py-10 space-y-20 shadow-lg">
        <Link to="/" className="text-black hover:text-gray-600 mt-20">
          <Home size={40} />
        </Link>
        <Link to="/posts/create" className="text-black hover:text-gray-600">
          <Plus size={40} />
        </Link>
        <Link to="/community" className="text-black hover:text-gray-600">
          <Users size={40} />
        </Link>
      </div>

      {/* Main Content */}
      <div className="ml-20 p-7 w-full flex items-center justify-between">
        {/* Search Bar */}
        <div className="w-full relative rounded-full">
          <div className="relative">
            <label htmlFor="default-search" className="sr-only">
              Search
            </label>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full px-4 py-3 pl-10 text-black border border-black rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              required
            />
          </div>
        </div>

        {/* Profile Icon with Dropdown */}
        <div className="relative ml-4">
          {/* Profile Icon */}
          <User
            size={50}
            className="text-white cursor-pointer"
            onClick={toggleDropdown}
          />

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
              <ul className="py-2">
                {isAuthenticated ? (
                  <>
                    <li className="px-4 py-2 text-sm font-semibold text-gray-700">
                      Hello, {user?.username || "User"}
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-200"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/api/auth/login"
                        className="block px-4 py-2 text-sm hover:bg-gray-200"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/api/auth/register"
                        className="block px-4 py-2 text-sm hover:bg-gray-200"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Sidebar;
