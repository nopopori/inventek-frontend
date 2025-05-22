import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterForm from './components/auth/RegisterForm.jsx';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';

import './App.css';

function App() {
  return (
    <Dashboard />
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LoginPage />} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<RegisterForm />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="/profilpage" element={<ProfilePage />} />
    //   </Routes>
    // </Router>
  );
}

export default App;