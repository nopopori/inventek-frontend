import React, { useState, useEffect } from 'react';
import { ChevronRight, Package, Users, Home, Menu, X, LogOut } from 'lucide-react';
import './Dashboard.css';
import ChartSection from './Chart.jsx';
import Sidebar from './sidebar';
import axios from '../api/axios';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [gudangList, setGudangList] = useState([]);
  const [userData, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);


   useEffect(() => {
      fetchProducts();
      fetchGudang();
      fetchUser();
    }, []);
  

  const fetchProducts = async () => {
      try {
        const res = await axios.get('/product');
        if (res.data.success) {
          setProductData(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchUser = async () => {
      try{
        const res = await axios.get('/user');
        if(res.data.success){
          setUserList(res.data.data);
        }
      }catch(error){
        console.error('Error fetching products:', error);
      }
    }
  

  const fetchGudang = async () => {
    try {
        const response = await axios.get('/gudang');
        const data = response.data;
  
        if (Array.isArray(data)) {
          setGudangList(data);
        } else if (Array.isArray(data.data)) {
          setGudangList(data.data);
        } else {
          console.error('Format data gudang tidak valid:', data);
          setGudangList([]);
        }
      } catch (error) {
        console.error('Gagal memuat data gudang:', error);
      }
    };

    // Overview stats
  const overviewStats = {
    totalProducts: productData.length,
    totalGudang: gudangList.length,
    totalUsers: userData.length,
  };


  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Package, label: "Gudang" },
    { icon: Menu, label: "Kategori" },
    { icon: Package, label: "Produk" },
    { icon: Package, label: "Laporan" },
    { icon: Users, label: "Profile" }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
    }
  };

  const StatusBadge = ({ status }) => (
    <span className={`status-badge ${status.toLowerCase()}`}>
      {status}
    </span>
  );

  const StatCard = ({ icon: Icon, value, iconBg, label }) => (
    <div className="stat-card">
      <div className={`stat-icon ${iconBg}`}>
        <Icon size={24} />
      </div>
      <div className="stat-value">
        {value.toLocaleString()}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <Sidebar /> 

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <button
            className="menu-btn mobile-only"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="header-title">Dashboard</h1>
        </header>

        {/* Content */}
        <div className="content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <StatCard 
              icon={Package} 
              value={overviewStats.totalProducts} 
              iconBg="blue"
              label="Produk"
            />
            <StatCard 
              icon={Users} 
              value={overviewStats.totalUsers} 
              iconBg="green"
              label="Users"
            />
            <StatCard 
              icon={Home} 
              value={overviewStats.totalGudang} 
              iconBg="purple"
              label="Gudang"
            />
          </div>

          {/* Chart Section */}
          <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', marginTop: 24 }}>
            <ChartSection />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};



export default Dashboard;