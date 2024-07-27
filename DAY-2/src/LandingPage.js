// src/components/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import multiimage from './meditating.png';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  return (
    <div className='supernova'>
      <nav className="navbar">
        <div className="navText">ChronoCraft</div>
        <div className="navButtons">
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
          <Link to="/register">
            <button className="button">Register</button>
          </Link>
        </div>
      </nav>
      <main className="mainSTUFF">
        <h1>Design, Structurize, Organize, Achieve!</h1>
        <img src={multiimage} alt="waitaminute" className="image" height="450"></img>
      </main>
    </div>
  );
};

export default LandingPage;
