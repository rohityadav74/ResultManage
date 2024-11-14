import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn, onLogout }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* Home link that resets the login state */}
      <Link to="/" className="nav-link" onClick={onLogout}>Home</Link>

      {/* Conditionally render "Check Result" link if not logged in and not on Check Result page */}
      {!isLoggedIn && location.pathname !== "/check-result" && (
        <Link to="/check-result" className="nav-link">Check Result</Link>
      )}

      {/* Conditionally render "Admin" link if not on Check Result page */}
      {!isLoggedIn && location.pathname !== "/check-result" && (
        <Link to="/admin" className="nav-link">Admin</Link>
      )}
    </nav>
  );
}

export default Navbar;
