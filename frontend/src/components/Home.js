import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import iiitImage from './iiit.jpg';

function Home() {
  return (
    <div className="home">
      {/* Heading */}
      <h1 className="heading">Result Management System</h1>
      
      {/* Main image */}
      <div className="home-image">
        <img src={iiitImage} alt="Main" />
      </div>

    </div>
  );
}

export default Home;

