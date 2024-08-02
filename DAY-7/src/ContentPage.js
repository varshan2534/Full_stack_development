import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContentPage.css';

const ContentPage = () => {
  const [importantTasks, setImportantTasks] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImportantTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tasks/important');
        setImportantTasks(response.data);
      } catch (error) {
        console.error('Error fetching important tasks:', error);
      }
    };

    const fetchTodaysEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events'); // Adjust the endpoint if needed
        const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
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
  }, []);

  const Logout = () => {
    navigate('/login');
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
    </div>
  );
};

export default ContentPage;
