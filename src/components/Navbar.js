import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Navbar = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Show brand name only when user is NOT logged in */}
        {!isAuthenticated && (
          <Link to="/" className="nav-brand">
            API <span className="brand-highlight">Limiter</span>
          </Link>
        )}

        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/playground" className="nav-link">Playground</Link>

              <div className="nav-user">
                <span className="user-email" title={userEmail}>
                  {userEmail}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
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
