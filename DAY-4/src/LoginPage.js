// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './LoginPage.css'; // Import the CSS file
// // import multilogger from './multi-login.png';
// import login from './login.png';

// import { Link } from 'react-router-dom';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/login/check', { username, password });
//       if (response.status === 200 && response.data.success) {
//         // Store user data in local storage if needed
//         localStorage.setItem('user', JSON.stringify(response.data));
//         navigate('/contentpage');
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error logging in', error);
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <div className='supernova'>
//       <nav className="navbar">
//         <div className="navText">ChronoCraft
//         <Link to="/" className="homeButton">
//             🏠
//           </Link>
//         </div>
//         <div className="navButtons">
//           <Link to="/login">
//             <button className="button">Login</button>
//           </Link>
//           <Link to="/register">
//             <button className="button">Register</button>
//           </Link>
//         </div>
//       </nav>
//     <div className="login-container">
//       <img src={login} alt="Meditation" className="login-image" />
//       <div className="login-card">
//         <h2>Login Page</h2>
//         <form onSubmit={handleLogin}>
//           <div className='input-det'>
//             <label>Username:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className='submitter'>
//             <button type="submit">Login</button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import login from './login.png';
import { Link } from 'react-router-dom';

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
        // Store user data in local storage if needed
        localStorage.setItem('user', JSON.stringify(userData));

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
          <Link to="/" className="homeButton">🏠</Link>
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
      <div className="login-container">
        <img src={login} alt="Meditation" className="login-image" />
        <div className="login-card">
          <h2>Login Page</h2>
          <form onSubmit={handleLogin}>
            <div className='input-det'>
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
