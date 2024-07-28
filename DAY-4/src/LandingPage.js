import React from 'react';
import { Link } from 'react-router-dom';
// import multiimage from './meditating.png';
import './LandingPage.css'; // Import the CSS file
import woman from './woman.png';
// import logo from './Logo2.png';

const LandingPage = () => {
  return (
    <div className='supernova'>
      <nav className="navbar">
        <div className="navText">
          ChronoCraft
          {/* <img src={logo} alt="hello" className='logo'></img> */}
        <Link to="/" className="homeButton">🏠
          </Link>
        </div>
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
        <div className="leftSection">
          <img src={woman} alt="waitaminute" className="image" height="450"></img>
        </div>
        <div className="rightSection">
          <h1>Design, Structurize, Organize, Achieve!</h1>
          <p>Welcome to ChronoCraft, your ultimate productivity companion. 
             Manage your tasks with our to-do list, stay on top of your schedule with our calendar, 
             set alerts for important deadlines, and keep track of your thoughts with our notes feature. 
             Achieve more with ChronoCraft!</p>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
