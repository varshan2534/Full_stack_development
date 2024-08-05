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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contentpage" element={<ContentPage />}/>
        <Route path="/work" element={<Work />}/>
        <Route path="/timer" element={<Timer />}/>
        <Route path="/calendar" element={<Calendar />}/>
        <Route path="/todolist" element={<ToDoList />}/>
        <Route path="/admin" element={<AdminPage />}/>
        <Route path="/aischeduler" element={<AiScheduler />}/>
      </Routes>
    </Router>
  );
};

export default App;
