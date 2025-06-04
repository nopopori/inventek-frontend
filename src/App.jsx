import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Register from './Register';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import Gudang from './components/Gudang';
import Kategori from './components/Kategori';
import Product from './components/Product';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gudang"
        element={
          <ProtectedRoute>
            <Gudang />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
        />
      <Route
        path="/kategori"
        element={
          <ProtectedRoute>
            <Kategori />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product"        element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
