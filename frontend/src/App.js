// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
// import Home from "./components/Home";
// import CheckResult from "./components/CheckResult";
// import Admin from "./components/Admin";
// import "./App.css";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Router>
//       <div className="app">
//         <nav className="navbar">
//           <Link to="/">Home</Link>
//           <Link to="/check-result">Check Result</Link>
//           {!isLoggedIn ? (
//             <Link to="/admin">Admin</Link>
//           ) : (
//             <button onClick={() => setIsLoggedIn(false)}>Logout</button>
//           )}
//         </nav>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/check-result" element={<CheckResult />} />
//           <Route path="/admin" element={<Admin setIsLoggedIn={setIsLoggedIn} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Admin from "./components/Admin";
import CheckResult from "./components/CheckResult";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define a logout function that resets isLoggedIn
  const onLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/check-result" element={<CheckResult />} />
      </Routes>
    </Router>
  );
}

export default App;


