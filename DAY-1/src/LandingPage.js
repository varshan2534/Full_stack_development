// src/components/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import multiimage from './multitasking-concept.jpg';

const LandingPage = () => {
  return (
    <div>
      <nav style={styles.navbar}>
        <div style={styles.navText}>ChronoCraft</div>
        <div style={styles.navButtons}>
          <Link to="/login">
            <button style={styles.button}>Login</button>
          </Link>
          <Link to="/register">
            <button style={styles.button}>Register</button>
          </Link>
        </div>
      </nav>
      <main style={styles.main}>
        <h1>Design, Structurize, Organize, Achieve!</h1>
        <img src={multiimage} alt="waitaminute" style={styles.image} height="450"></img>
      </main>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
  },
  navText: {
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: "Papyrus",
  },
  navButtons: {
    display: 'flex',
},
button: {
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: "Papyrus",
    fontSize: '20px',
},
  main: {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Papyrus',
  },
  image: {
    marginTop: '20px',
    alignItems: 'center',
    hover:"1000px",
  },
};

export default LandingPage;
