// Admin.js file
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadResult from "./UploadResult";  // Import the UploadResult component
import "./Admin.css";

function Admin({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track admin authentication
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check for both hardcoded admin credentials
    const validAdmins = [
      { email: "admin@example.com", password: "password123" },
      { email: "admin2@example.com", password: "password456" }
    ];

    const admin = validAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (admin) {
      setIsLoggedIn(true);
      setIsAuthenticated(true);  // Set admin as authenticated
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAuthenticated(false);  // Set admin as not authenticated
    navigate("/");
  };

  return (
    <div className="admin">
      {!isAuthenticated ? (
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <UploadResult />  {/* Show UploadResult component after login */}
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
}

export default Admin;
