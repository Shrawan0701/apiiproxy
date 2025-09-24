import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Navbar = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {!isAuthenticated && (
          <Link to="/" className="text-xl font-bold text-blue-600">
           Rate<span className="text-gray-800">Mate</span>
          </Link>
        )}


        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>


        <div
          className={`flex-col md:flex md:flex-row md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white shadow-md md:shadow-none p-4 md:p-0 transition-all ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/playground" className="nav-link">
                Playground
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm truncate max-w-[150px]">
                  {userEmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
