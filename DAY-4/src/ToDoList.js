// src/components/ToDoList.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ToDoList.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const navigate = useNavigate();

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, important: false }]);
      setTaskInput('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleImportant = (index) => {
    setTasks(
      tasks.map((task, i) => (i === index ? { ...task, important: !task.important } : task))
    );
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="content-page-container5">
      <aside className="sidebar5">
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
              <button onClick={handleLogout} className="logout-button5">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content5">
        <div className="todo-container">
          <h1>To-Do List</h1>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={addTask}>Add Task</button>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className={task.important ? 'important' : ''}>
                <span>{task.text}</span>
                <button onClick={() => toggleImportant(index)}>Important</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ToDoList;
