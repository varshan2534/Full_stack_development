import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'; // Import the CSS file
import meditater from './meditating.png';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', { username, email, password });
      if (response.status === 200 && response.data.success) {
        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(response.data.login));
        alert(response.data.message);
        navigate('/login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error registering user', error);
      alert('Registration failed');
    }
  };

  return (
    <div className='supernova'>
    <nav className="navbar">
        <div className="navText">
          ChronoCraft
        <Link to="/" className="homeButton">🏠
          </Link>
          </div>
        <div className="navButtons">
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
          <Link to="/register">
            <button className="button">Register</button>
          </Link>
        </div>
      </nav>
    <div className="register-page">
      <div className="register-content">
        <img src={meditater} alt="Meditation" className="register-image" />
        <div className="register-card">
          <h2>Register Page</h2>
          <form onSubmit={handleRegister}>
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
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
