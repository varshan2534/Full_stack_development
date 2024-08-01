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
        <div className="rightSection1">
          <h1>Transform your life!</h1>
          <p>with our productivity management system</p>
          <a href="#footerSection2" className="navigate-button">Services Offered</a>
        </div>
        <div className="footerSection1">
          <h1>About us</h1>
          <p>
          ChronoCraft is a comprehensive workflow management system designed to enhance productivity across various settings. Built with React, Spring Boot, and MySQL, it offers tools like to-do lists, calendars, alerts, and email notifications. With a user-friendly interface and real-time updates, ChronoCraft integrates seamlessly with other tools and ensures data security with advanced authentication and encryption. Its modular design supports scalability and customization, making it ideal for tech, education, and beyond. ChronoCraft transforms task and project management, helping organizations streamline processes and achieve their goals efficiently.
          </p>
        </div>
        <div id='footerSection2'>
          <h1>Services Offered</h1>
          <div class="card-container0">
    <div class="card0">
      <h2>Notes</h2>
      <p>Capture and organize important information in a digital notepad.</p>
    </div>
    <div class="card0">
      <h2>To-Do List</h2>
      <p>Manage tasks efficiently with a customizable list to track progress.</p>
    </div>
    <div class="card0">
      <h2>Calendar</h2>
      <p> Schedule and view events and deadlines with an interactive calendar.</p>
    </div>
    <div class="card0">
      <h2>Daily Planner</h2>
      <p>Plan and prioritize your daily activities to stay organized and productive.</p>
    </div>
    <div class="card0">
      <h2>Pomodoro Timer</h2>
      <p> Boost focus and productivity with timed work intervals and breaks.</p>
    </div>
    <div class="card0">
      <h2>Email Alerts</h2>
      <p>Receive timely notifications and updates directly to your inbox.</p>
    </div>
  </div>
        </div>
    </div>
  );
};

export default LandingPage;
