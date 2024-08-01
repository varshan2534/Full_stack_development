import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Work.css';

const Work = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const userId = 1; // Replace with the actual user ID

  useEffect(() => {
    // Fetch tasks from backend
    axios.get(`http://localhost:8080/api/notes/${userId}`)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const addTask = () => {
    if (!title || !description) {
      alert('Title and description are required');
      return;
    }
    const newTask = { userId, title, notes: description };
    axios.post('http://localhost:8080/api/notes', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setTitle('');
        setDescription('');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.notes);
      setEditingId(id);
    }
  };

  const saveEdit = () => {
    if (!title || !description) {
      alert('Title and description are required');
      return;
    }
    const updatedTask = { userId, title, notes: description };
    axios.put(`http://localhost:8080/api/notes/${editingId}`, updatedTask)
      .then(response => {
        const updatedTasks = tasks.map(task =>
          task.id === editingId ? response.data : task
        );
        setTasks(updatedTasks);
        setEditingId(null);
        setTitle('');
        setDescription('');
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/api/notes/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="work-container">
      <aside className="sidebar2">
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
              <Link to="/aischeduler">Ai Scheduler 🤖</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="only-but2">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content2">
        <h2>Notes</h2>
        <div className="task-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {editingId ? (
            <button onClick={saveEdit}>Save</button>
          ) : (
            <button onClick={addTask}>Add Task</button>
          )}
        </div>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.notes}</p>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => editTask(task.id)}>Edit</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Work;
