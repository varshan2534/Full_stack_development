import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link, useNavigate } from 'react-router-dom';
import './Calendar.css';

function Calendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    setEvents(storedEvents);
  }, []);

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      const updatedEvents = events.filter(event => event.title !== clickInfo.event.title || event.start === clickInfo.event.start);
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    }
  };

  const handleSelect = (selectInfo) => {
    const start = selectInfo.startStr;
    const end = selectInfo.endStr;
    const title = prompt("Enter a title for your event:");
    if (title) {
      const newEvent = {
        title,
        start,
        end,
      };
      const updatedEvents = [...events, newEvent];
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
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
          select={(selectInfo) => handleSelect(selectInfo)}
        />
      </main>
    </div>
  );
}

export default Calendar;
