import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AiScheduler.css'; // Import the CSS file
// import micIcon from './mic.png'; // Import mic icon

const AiScheduler = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="ai-scheduler-container6">
      <aside className="sidebar6">
      <h2 className='titlet'>ChronoCraft</h2>
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
              <Link to="/todolist">To-Do List ✔</Link>
            </li>
            <li>
              <Link to="/aischeduler">Ai Scheduler 🤖</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="only-but6">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="ai-scheduler-content6">
        <div className="card6">
          <h2>Enter Your Prompt</h2>
          <div className="prompt-input">
            <input type="text" placeholder="Type your prompt here..." />
            <button className="mic-button">
                🎙
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiScheduler;
