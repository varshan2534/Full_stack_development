import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import './Navbar.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login/check', { username, password });
      if (response.status === 200 && response.data.success) {
        const userData = response.data;
        // Store user data in local storage
        localStorage.setItem('username',username);
        localStorage.setItem('userId', userData.userId);
        localStorage.setItem('role', userData.role); // Save the user's role if available
        localStorage.setItem('token', userData.token); // Store the token if you're using one
  
        if (username === 'varshan_24') {
          navigate('/admin');
        } else {
          navigate('/contentpage');
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Invalid username or password');
    }
  };
  return (
    <div className='supernova'>
      <nav className="navbar">
        <div className="navText">
          ChronoCraft
        </div>
        <div className="navButtons">
          <Link to="/">
            <button className="button">Home</button>
          </Link>
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
          <Link to="/register">
            <button className="button">Register</button>
          </Link>
        </div>
      </nav>
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='submitter'>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
