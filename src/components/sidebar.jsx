import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { ChevronRight, LogOut, X, Box, Archive, Layers, FileText, User, Home } from 'lucide-react';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard', active: window.location.pathname === '/dashboard' },
    { label: 'Gudang', icon: Archive, path: '/gudang', active: window.location.pathname === '/gudang' },
    { label: 'Kategori', icon: Layers, path: '/kategori', active: window.location.pathname === '/kategori' },
    { label: 'Produk', icon: Box, path: '/product', active: window.location.pathname === '/produk' },
    { label: 'Laporan', icon: FileText, path: '/laporan', active: window.location.pathname === '/laporan' },
    { label: 'Profile', icon: User, path: '/profile', active: window.location.pathname === '/profile' },
  ];

 const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    localStorage.removeItem('token');
    navigate('/login');
  } catch (error) {
    console.error('Logout gagal:', error);
    alert('Logout gagal, coba lagi.');
  }
};

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false); // Tutup sidebar di mobile setelah klik
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">D</div>
          <span className="logo-text">Dashboard</span>
        </div>
        <button
          className="close-btn mobile-only"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#!"
            className={`nav-item ${item.active ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(item.path);
            }}
          >
            <div className="nav-content">
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
            <ChevronRight size={16} />
          </a>
        ))}
      </nav>

      <div className="logout-section">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
