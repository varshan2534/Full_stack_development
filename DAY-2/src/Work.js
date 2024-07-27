import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Work.css';

const Work = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleLogout = () => {
    navigate('/login');
  };

  const addTask = () => {
    if (!title || !description) {
      alert('Title and description are required');
      return;
    }
    const newTask = { id: Date.now(), title, description };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTitle('');
    setDescription('');
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setEditingId(id);
    }
  };

  const saveEdit = () => {
    if (!title || !description) {
      alert('Title and description are required');
      return;
    }
    const updatedTasks = tasks.map(task =>
      task.id === editingId ? { ...task, title, description } : task
    );
    setTasks(updatedTasks);
    setEditingId(null);
    setTitle('');
    setDescription('');
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="work-container">
      <aside className="sidebar2">
        <h2>Menu</h2>
        <nav>
          <ul>
            <li>
              <Link to="/contentpage">Home</Link>
            </li>
            <li>
              <Link to="/work">Tasks</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/timer">Timer</Link>
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
              <p>{task.description}</p>
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
