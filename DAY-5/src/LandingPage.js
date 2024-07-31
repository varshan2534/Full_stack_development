import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file
import './Navbar.css';
const LandingPage = () => {
  return (
    <div className='supernova1'>
      <nav className="navbar">
        <div className="navText">
          ChronoCraft
        </div>
        <div className="navButtons">
          <Link to="/">
          <button className="button">Home</button>
          </Link>
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
          <Link to="/register">
            <button className="button">Register</button>
          </Link>
        </div>
      </nav>
      <main className="mainSTUFF1">
        <div className="rightSection1">
          <h1>Design, Structurize, Organize, Achieve!</h1>
          <p>Welcome to ChronoCraft, your ultimate productivity companion. 
             Manage your tasks with our to-do list, stay on top of your schedule with our calendar, 
             set alerts for important deadlines, and keep track of your thoughts with our notes feature. 
             Achieve more with ChronoCraft!</p>
        </div>
      </main>
      <footer className="footer1">
        <div className="footerSection1">
          <h2>About Us</h2>
          <p>ChronoCraft is dedicated to helping you achieve your productivity goals through efficient task management and scheduling.</p>
        </div>
        <div className="footerSection1">
          <h2>Contact Us</h2>
          <p>Email: support@chronocraft.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
