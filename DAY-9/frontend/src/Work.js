import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Work.css';

const Work = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    if (userId) {
      // Fetch tasks only if userId is available
      axios.get(`http://localhost:8080/api/notes/${userId}`)
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [userId]); // Include userId as a dependency

  const handleLogout = () => {
    navigate('/login');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setTitle('');
    setDescription('');
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
        closeModal();
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.notes);
      setEditingId(id);
      openModal(); // Open the modal when editing a task
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
        closeModal();
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
            <li><Link to="/contentpage">Home</Link></li>
            <li><Link to="/work">Notes</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/timer">Pomodoro Tracker</Link></li>
            <li><Link to="/todolist">To-Do List</Link></li>
            <li><Link to="/aischeduler">Ai Scheduler</Link></li>
            <li><button onClick={handleLogout} className="only-but2">Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main className="content2">
        <h2>Notes</h2>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.notes}</p>
              <button onClick={() => deleteTask(task.id)} id='del-but'>Delete</button>
              <button onClick={() => editTask(task.id)}>Edit</button>
            </div>
          ))}
        </div>
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <span className="close-btn" onClick={closeModal}>&times;</span>
              <div className="modal-header">{editingId ? 'Edit Task' : 'Add Task'}</div>
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
              <button onClick={editingId ? saveEdit : addTask}>
                {editingId ? 'Save' : 'Add Task'}
              </button>
            </div>
          </div>
        )}
        <button className="floating-btn" onClick={() => { setTitle(''); setDescription(''); setEditingId(null); openModal(); }}>+</button>
      </main>
    </div>
  );
};

export default Work;
