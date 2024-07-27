// src/components/ContentPage.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ContentPage.css';

const ContentPage = () => {
  const navigate = useNavigate();

  const Logout = () => {
    navigate('/login');
  };

  return (
    <div className="content-page-container1">
      <aside className="sidebar1">
        <h2>Menu</h2>
        <nav>
          <ul>
            <li>
              <Link to="/contentpage">Home</Link>
            </li>
            <li>
              <Link to="/work">Tasks</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/timer">Timer</Link>
            </li>
            <li>
              <button onClick={Logout} className="only-but1">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content1">
        <div className="cards-container">
          <div className="card">
            <h2>Completed Tasks</h2>
            <p>Task 1</p>
            <p>Task 2</p>
            {/* Add more completed tasks here */}
          </div>
          <div className="card">
            <h2>Pending Tasks</h2>
            <p>Task 1</p>
            <p>Task 2</p>
            {/* Add more pending tasks here */}
          </div>
          <div className="card">
            <h2>Missed Tasks</h2>
            <p>Task 1</p>
            <p>Task 2</p>
            {/* Add more missed tasks here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentPage;
