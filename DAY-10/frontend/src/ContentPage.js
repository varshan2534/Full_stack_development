import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContentPage.css';

const ContentPage = () => {
  const [importantTasks, setImportantTasks] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState({ username: '', email: '', password: '', role: '' });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const loggedInUser = localStorage.getItem('username');

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/login/username/${loggedInUser}`);
      const user = response.data;
      if (user) {
        setUserId(user.id);
        setProfileInfo({ username: user.username, email: user.email, password: user.password, role: user.role });
      } else {
        console.error('User not found in API response');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, [loggedInUser]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    const fetchImportantTasks = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/tasks/important/${userId}`);
          setImportantTasks(response.data);
        } catch (error) {
          console.error('Error fetching important tasks:', error);
        }
      }
    };

    const fetchTodaysEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/${userId}`);
        const today = new Date().toISOString().slice(0, 10);
        const filteredEvents = response.data.filter(event =>
          new Date(event.start).toISOString().slice(0, 10) === today
        );
        setTodaysEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching today\'s events:', error);
      }
    };

    fetchImportantTasks();
    fetchTodaysEvents();
  }, [userId]);

  const Logout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
    setEditing(false);
  };

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, profileInfo);
      setEditing(false);
      setShowProfileModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="content-page-container1">
      <aside className="sidebar1">
        <h2>ChronoCraft</h2>
        <nav>
          <ul>
            <li><Link to="/contentpage">Home</Link></li>
            <li><Link to="/work">Notes</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/timer">Pomodoro Tracker</Link></li>
            <li><Link to="/todolist">To-Do List</Link></li>
            <li><Link to="/aischeduler">Ai Scheduler</Link></li>
            <li><button onClick={Logout} className="only-but1">Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main className="content1">
        <div className="profile-icon" onClick={handleProfileClick}>
          {loggedInUser.charAt(0).toUpperCase()}
        </div>
        <div className="cards-container">
          <div className="card">
            <h2>Today's Events</h2>
            {todaysEvents.length ? (
              <ul>
                {todaysEvents.map(event => (
                  <li key={event.id}>{event.title}</li>
                ))}
              </ul>
            ) : (
              <p>No events for today.</p>
            )}
          </div>
          <div className="card">
            <h2>Important To Do</h2>
            {importantTasks.length ? (
              <ul>
                {importantTasks.map(task => (
                  <li key={task.id}>{task.task}</li>
                ))}
              </ul>
            ) : (
              <p>No important tasks.</p>
            )}
          </div>
          <div className="card">
            <h2>Personal Quotes</h2>
            <p>"That a man can change himself and his destiny is the conclusion of every mind which is wide awake to the power of right thought"</p>
          </div>
        </div>
      </main>
      {showProfileModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="profile-modal" onClick={e => e.stopPropagation()}>
            <h2>Profile Information</h2>
            <div>
              <label>Username:&nbsp;&nbsp;&nbsp;</label>
              <input
                type="text"
                value={profileInfo.username}
                onChange={(e) => setProfileInfo({ ...profileInfo, username: e.target.value })}
                disabled={!editing}
                className='username-input'
                />
            </div>
            <div>
              <label>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input
                type="email"
                value={profileInfo.email}
                onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
                disabled={!editing}
                className='username-input'
                />
            </div>
            <div>
              <label>Password:&nbsp;&nbsp;&nbsp;</label>
              <input
                type="password"
                value={profileInfo.password}
                onChange={(e) => setProfileInfo({ ...profileInfo, password: e.target.value })}
                disabled={!editing}
                className='username-input'
                />
            </div>
            <div>
              <label>Role:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </label>
              <input
                type="text"
                value={profileInfo.role}
                onChange={(e) => setProfileInfo({ ...profileInfo, role: e.target.value })}
                disabled
                className='username-input'
                />
            </div>
            <div className="modal-buttons">
              {editing ? (
                <button onClick={handleSaveProfile} className='saver'>Save</button>
              ) : (
                <button onClick={handleEditProfile} className='saver'>Edit</button>
              )}
              <button onClick={handleCloseModal} className='terminator'>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
