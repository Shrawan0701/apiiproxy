import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Navbar = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);


  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {

    return (
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            Rate<span style={{ color: "#111" }}>Mate</span>
          </Link>
        </div>
      </nav>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {!isAuthenticated && (
          <Link to="/" className="nav-brand">
            Rate<span style={{ color: "#111" }}>Mate</span>
          </Link>
        )}


        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>


        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/playground" className="nav-link">
                Playground
              </Link>
              <div className="nav-user">
                <span className="user-email">{userEmail}</span>
                <button onClick={handleLogout} className="logout-btn">
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
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
