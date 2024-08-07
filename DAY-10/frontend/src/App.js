import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ContentPage from './ContentPage';
import Work from './Work';
import Timer from './Timer';
import Calendar from './Calendar';
import ToDoList from './ToDoList';
import AdminPage from './AdminPage';
import AiScheduler from './AiScheduler';
import AuthGuard from './AuthGuard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/contentpage" 
          element={
            <AuthGuard>
              <ContentPage />
            </AuthGuard>
          } 
        />
        <Route 
          path="/work" 
          element={
            <AuthGuard>
              <Work />
            </AuthGuard>
          } 
        />
        <Route 
          path="/timer" 
          element={
            <AuthGuard>
              <Timer />
            </AuthGuard>
          } 
        />
        <Route 
          path="/calendar" 
          element={
            <AuthGuard>
              <Calendar />
            </AuthGuard>
          } 
        />
        <Route 
          path="/todolist" 
          element={
            <AuthGuard>
              <ToDoList />
            </AuthGuard>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <AuthGuard>
              <AdminPage />
            </AuthGuard>
          } 
        />
        <Route 
          path="/aischeduler" 
          element={
            <AuthGuard>
              <AiScheduler />
            </AuthGuard>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
