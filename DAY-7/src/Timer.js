import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Timer.css';

const Timer = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    const storedTime = JSON.parse(localStorage.getItem('time')) || 25 * 60;
    const storedIsActive = JSON.parse(localStorage.getItem('isActive')) || false;
    const storedIsBreak = JSON.parse(localStorage.getItem('isBreak')) || false;
    
    setTime(storedTime);
    setIsActive(storedIsActive);
    setIsBreak(storedIsBreak);
  }, []);

  useEffect(() => {
    localStorage.setItem('time', JSON.stringify(time));
    localStorage.setItem('isActive', JSON.stringify(isActive));
    localStorage.setItem('isBreak', JSON.stringify(isBreak));
  }, [time, isActive, isBreak]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    if (time === 0) {
      if (!isBreak) {
        // Notify user that work session is over
        notifyUser('Work session is over! Time for a break.');
        setIsBreak(true);
        setTime(5 * 60); // 5 minute break
      } else {
        // Notify user that break session is over
        notifyUser('Break time is over! Back to work.');
        setIsBreak(false);
        setTime(25 * 60); // 25 minute work session
      }
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const notifyUser = (message) => {
    // Show browser notification
    if (Notification.permission === 'granted') {
      new Notification(message);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(message);
        }
      });
    } else {
      // Fallback to alert if notifications are not supported
      alert(message);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="content-page-container4">
      <aside className="sidebar4">
        <h2>ChronoCraft</h2>
        <nav>
          <ul>
          <li>
              <Link to="/contentpage">Home</Link>
            </li>
            <li>
              <Link to="/work">Notes</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/timer">Pomodoro Tracker</Link>
            </li>
            <li>
              <Link to="/todolist">To-Do List</Link>
            </li>
            <li>
              <Link to="/aischeduler">Ai Scheduler</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="only-but4">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content4">
        <div className="timer-container">
          <h2>{isBreak ? 'Break Time' : 'Work Time'}</h2>
          <div className="timer-display">{formatTime(time)}</div>
          <button
            className="timer-button"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            className="timer-button"
            onClick={() => {
              setIsActive(false);
              setIsBreak(false);
              setTime(25 * 60);
            }}
          >
            Reset
          </button>
        </div>
      </main>
    </div>
  );
};

export default Timer;
