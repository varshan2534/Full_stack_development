import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const AuthContext = createContext();

// Create Provider Component
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in (this should be replaced with your actual authentication check)
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/current'); // Endpoint to get current user ID
        setUserId(response.data.userId);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user ID:', error);
        setIsAuthenticated(false);
      }
    };

    fetchUserId();
  }, []);

  const logout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout'); // Endpoint to handle logout
      setUserId(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
