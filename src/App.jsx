import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Register from './Register';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import Gudang from './components/Gudang';

import './App.css';

function App() {
  return (
    <Gudang />
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LoginPage />} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="/profilpage" element={<ProfilePage />} />
    //   </Routes>
    // </Router>
  );
}

export default App;