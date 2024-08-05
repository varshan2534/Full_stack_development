import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'; // Import format from date-fns
import emailjs from 'emailjs-com';
import './Calendar.css';
import './Modal.css'; // Import the modal CSS

function Calendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', description: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

  const loggedInUser = localStorage.getItem('username');

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/login/username/${loggedInUser}`);
      const user = response.data;
      if (user) {
        setUserId(user.id);
        setEmail(user.email); // Set email here
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
    if (userId) { // Don't fetch events if userId is not set
      try {
        const response = await axios.get(`http://localhost:8080/api/events/${userId}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events when userId is set
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const upcomingEvents = events.filter(event => {
        const startTime = new Date(event.start);
        const timeDifference = startTime - now;
        return timeDifference > 0 && timeDifference <= 600000; 
      });

      upcomingEvents.forEach(event => {
        sendEmailAlert(event);
      });
    }, 60000); 
  
    return () => clearInterval(interval);
  }, [events]);

  const sendEmailAlert = (event) => { 
    const templateParams = {
      to_email: email,
      event_title: event.title,
      event_start: new Date(event.start).toLocaleString(),
      event_description: event.description || 'No description provided',
    };

    emailjs.send('service_mfz040b', 'template_p5xpso7', templateParams, 'wsEAq-jRfG173SoZM')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
  };

  const handleEventClick = (clickInfo) => {
    const { id, title, extendedProps } = clickInfo.event;
    setSelectedEvent({
      id,
      title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      description: extendedProps.description
    });
    setShowEventDetailsModal(true);
  };

  const confirmDeleteEvent = async () => {
    if (deleteEventId) {
      try {
        await axios.delete(`http://localhost:8080/api/events/${deleteEventId}`);
        fetchEvents(); // Refresh events after deletion
        setShowDeleteModal(false);
        setDeleteEventId(null);
        setShowEventDetailsModal(false); // Close event details modal
      } catch (error) {
        console.error("Error deleting event", error);
      }
    }
  };

  const handleSelect = (selectInfo) => {
    setNewEvent({
      title: '',
      start: format(new Date(selectInfo.startStr), "yyyy-MM-dd'T'HH:mm:ss"),
      end: format(new Date(selectInfo.endStr), "yyyy-MM-dd'T'HH:mm:ss"),
      description: '' // Initialize description
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
      setNewEvent({ title: '', start: '', end: '', description: '' });
    } catch (error) {
      console.error("Error creating event", error);
    }
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/events/${selectedEvent.id}`, {
        ...newEvent,
        userId,
        start: format(new Date(newEvent.start), "yyyy-MM-dd'T'HH:mm:ss"),
        end: format(new Date(newEvent.end), "yyyy-MM-dd'T'HH:mm:ss")
      });
      fetchEvents(); // Refresh events after update
      setShowUpdateModal(false);
      setShowEventDetailsModal(false); // Close event details modal
      setNewEvent({ title: '', start: '', end: '', description: '' });
    } catch (error) {
      console.error("Error updating event", error);
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
            <li><Link to="/contentpage">Home</Link></li>
            <li><Link to="/work">Notes</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/timer">Pomodoro Tracker</Link></li>
            <li><Link to="/todolist">To-Do List</Link></li>
            <li><Link to="/aischeduler">Ai Scheduler</Link></li>
            <li><button onClick={handleLogout} className="only-but3">Logout</button></li>
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
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              />
              <button type="submit">Add Event</button>
            </form>
          </div>
        </div>
      )}

      {showUpdateModal && selectedEvent && (
        <div className="calendar-modal" style={{ display: 'block' }}>
          <div className="calendar-modal-content">
            <span className="calendar-modal-close" onClick={() => setShowUpdateModal(false)}>&times;</span>
            <form className="calendar-modal-form" onSubmit={handleUpdateFormSubmit}>
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
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              />
              <button type="submit">Update Event</button>
            </form>
          </div>
        </div>
      )}

      {showEventDetailsModal && selectedEvent && (
        <div className="calendar-modal" style={{ display: 'block' }}>
          <div className="calendar-modal-content">
            <span className="calendar-modal-close" onClick={() => setShowEventDetailsModal(false)}>&times;</span>
            <h2>Event Details</h2>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <button onClick={() => setShowUpdateModal(true)}>Edit Event</button>
            <button onClick={() => {
              setDeleteEventId(selectedEvent.id);
              setShowDeleteModal(true);
            }}>Delete Event</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="calendar-modal" style={{ display: 'block' }}>
          <div className="calendar-modal-content">
            <span className="calendar-modal-close" onClick={() => setShowDeleteModal(false)}>&times;</span>
            <h2>Are you sure you want to delete this event?</h2>
            <button onClick={confirmDeleteEvent}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
