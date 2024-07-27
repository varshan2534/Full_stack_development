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
              <Link to="/contentpage">Home 💒</Link>
            </li>
            <li>
              <Link to="/work">Notes 📖</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar 📆</Link>
            </li>
            <li>
              <Link to="/timer">Pomodoro Tracker ⏰</Link>
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
            <h2>Today's Events</h2>
            <p>Review</p>
            <p>Update Github</p>
            {/* Add more completed tasks here */}
          </div>
          <div className="card">
            <h2>Important To Do</h2>
            <p>Aicte</p>
            <p>Internship 2</p>
            {/* Add more pending tasks here */}
          </div>
          <div className="card">
            <h2>Personal Quotes</h2>
            <p>"That a man can change himself and his destiny is the conclusion of every mind which is 
                wide awake to the power of right thought"
            </p>
            {/* Add more missed tasks here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentPage;
