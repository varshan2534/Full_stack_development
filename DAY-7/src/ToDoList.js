import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ToDoList.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const userId = 1; // Assuming a logged-in user with ID 1, replace with actual user ID
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/tasks/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const fetchImportantTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/tasks/${userId}/important`);
      return response.data;
    } catch (error) {
      console.error('Error fetching important tasks:', error);
    }
  };
  
  // Fetch important tasks and pass them to ContentPage
  useEffect(() => {
    fetchTasks();
    fetchImportantTasks(); // Fetch important tasks
  }, []);

  const addTask = async () => {
    if (taskInput.trim()) {
      const newTask = { userId, task: taskInput, important: false };
      try {
        const response = await axios.post('http://localhost:8080/api/tasks', newTask);
        setTasks([...tasks, response.data]);
        setTaskInput('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleImportant = async (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    const updatedTask = { ...task, important: !task.important };
    try {
      const response = await axios.put(`http://localhost:8080/api/tasks/${taskId}`, updatedTask);
      setTasks(tasks.map(task => (task.id === taskId ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
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
              <Link to="/aischeduler">Ai Scheduler 🤖</Link>
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
            {tasks.map((task) => (
              <li key={task.id} className={task.important ? 'important' : ''}>
                <span>{task.task}</span>
                <button onClick={() => toggleImportant(task.id)}>Important</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ToDoList;


