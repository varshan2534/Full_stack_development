import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link, useNavigate } from 'react-router-dom';
import './Calendar.css';
import './Modal.css'; // Import the modal CSS
import axios from 'axios';
import { format, isToday } from 'date-fns'; // Import isToday from date-fns

function Calendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [userId, setUserId] = useState(null);

  const loggedInUser = localStorage.getItem('username');

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/login/username/${loggedInUser}`);
      const user = response.data;
      if (user) {
        setUserId(user.id);
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

  const fetchEvents = async () => {
    console.log(userId);
    if (userId) // Don't fetch events if userId is not set
    try {
      const response = await axios.get(`http://localhost:8080/api/events/${userId}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
    console.log(events);
  };

  useEffect(() => {
    fetchEvents(); // Fetch events when userId is set
  }, [userId]);

  const handleEventClick = (clickInfo) => {
    setDeleteEventId(clickInfo.event.id);
    setShowDeleteModal(true);
  };

  const confirmDeleteEvent = async () => {
    if (deleteEventId) {
      try {
        await axios.delete(`http://localhost:8080/api/events/${deleteEventId}`);
        fetchEvents(); // Refresh events after deletion
        setShowDeleteModal(false);
        setDeleteEventId(null);
      } catch (error) {
        console.error("Error deleting event", error);
      }
    }
  };

  const handleSelect = (selectInfo) => {
    setNewEvent({
      title: '',
      start: format(new Date(selectInfo.startStr), "yyyy-MM-dd'T'HH:mm:ss"),
      end: format(new Date(selectInfo.endStr), "yyyy-MM-dd'T'HH:mm:ss")
    });
    setShowCreateModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/events', {
        ...newEvent,
        userId, // Ensure userId is included
        start: format(new Date(newEvent.start), "yyyy-MM-dd'T'HH:mm:ss"),
        end: format(new Date(newEvent.end), "yyyy-MM-dd'T'HH:mm:ss")
      });
      fetchEvents(); // Refresh events after creation
      setShowCreateModal(false);
      setNewEvent({ title: '', start: '', end: '' });
    } catch (error) {
      console.error("Error creating event", error);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="calendar-container">
      <aside className="sidebar3">
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
              <button onClick={handleLogout} className="only-but3">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content3">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"90vh"}
          events={events}
          eventClick={handleEventClick}
          selectable={true}
          select={handleSelect}
        />
      </main>

      {showCreateModal && (
        <div className="calendar-modal" style={{ display: 'block' }}>
          <div className="calendar-modal-content">
            <span className="calendar-modal-close" onClick={() => setShowCreateModal(false)}>&times;</span>
            <form className="calendar-modal-form" onSubmit={handleFormSubmit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="start">Start Time</label>
              <input
                type="datetime-local"
                id="start"
                name="start"
                value={newEvent.start}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="end">End Time</label>
              <input
                type="datetime-local"
                id="end"
                name="end"
                value={newEvent.end}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Create Event</button>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="calendar-modal" style={{ display: 'block' }}>
          <div className="calendar-modal-content">
            <span className="calendar-modal-close" onClick={() => setShowDeleteModal(false)}>&times;</span>
            <p>Are you sure you want to delete this event?</p>
            <button className="delete-modal-button" onClick={confirmDeleteEvent}>Yes, Delete</button>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
