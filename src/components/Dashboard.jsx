import React, { useState } from 'react';
import { ChevronRight, Package, Users, Home, Menu, X, LogOut } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample customer data
  const customers = [
    {
      id: 1,
      name: "Jane Cooper",
      company: "Microsoft",
      phone: "(225) 555-0118",
      email: "jane@microsoft.com",
      country: "United States",
      status: "Active"
    },
    {
      id: 2,
      name: "Floyd Miles",
      company: "Yahoo",
      phone: "(205) 555-0100",
      email: "floyd@yahoo.com",
      country: "Kiribati",
      status: "Inactive"
    },
    {
      id: 3,
      name: "Ronald Richards",
      company: "Adobe",
      phone: "(302) 555-0107",
      email: "ronald@adobe.com",
      country: "Israel",
      status: "Inactive"
    },
    {
      id: 4,
      name: "Marvin McKinney",
      company: "Tesla",
      phone: "(252) 555-0126",
      email: "marvin@tesla.com",
      country: "Iran",
      status: "Active"
    },
    {
      id: 5,
      name: "Jerome Bell",
      company: "Google",
      phone: "(629) 555-0129",
      email: "jerome@google.com",
      country: "Réunion",
      status: "Active"
    },
    {
      id: 6,
      name: "Kathryn Murphy",
      company: "Microsoft",
      phone: "(406) 555-0120",
      email: "kathryn@microsoft.com",
      country: "Curaçao",
      status: "Active"
    },
    {
      id: 7,
      name: "Jacob Jones",
      company: "Yahoo",
      phone: "(208) 555-0112",
      email: "jacob@yahoo.com",
      country: "Brazil",
      status: "Active"
    },
    {
      id: 8,
      name: "Kristin Watson",
      company: "Facebook",
      phone: "(704) 555-0127",
      email: "kristin@facebook.com",
      country: "Åland Islands",
      status: "Inactive"
    }
  ];

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

  const StatCard = ({ icon: Icon, value, iconBg }) => (
    <div className="stat-card">
      <div className={`stat-icon ${iconBg}`}>
        <Icon size={24} />
      </div>
      <div className="stat-value">
        {value.toLocaleString()}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">D</div>
            <span className="logo-text">Dashboard</span>
          </div>
          <button 
            className="close-btn mobile-only"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`nav-item ${item.active ? 'active' : ''}`}
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
              value={5423} 
              iconBg="blue"
            />
            <StatCard 
              icon={Users} 
              value={1893} 
              iconBg="green"
            />
            <StatCard 
              icon={Home} 
              value={189} 
              iconBg="purple"
            />
          </div>

          {/* Customers Table */}
          <div className="table-container">
            <div className="table-header">
              <h2>All Customers</h2>
              <p className="table-subtitle">Active Members</p>
            </div>
            
            <div className="table-wrapper">
              <table className="customers-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Company</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="customer-name">{customer.name}</td>
                      <td>{customer.company}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>
                      <td>{customer.country}</td>
                      <td>
                        <StatusBadge status={customer.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination-info">
                Showing data 1 to 8 of 256K entries
              </div>
              <div className="pagination-controls">
                <button>&lt;</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <span>...</span>
                <button>40</button>
                <button>&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default Dashboard;