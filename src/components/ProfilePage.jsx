import React from 'react';
import './ProfilePage.css';
import { ChevronRight, Search, Bell, ChevronDown, Mail, Plus } from 'lucide-react';
import defaultProfileImage from '../assets/profile.jpg';

const ProfilePage = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">
            <div className="hexagon"></div>
          </div>
          <h2 className="logo-text">Dashboard<span className="logo-beta">Beta</span></h2>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item">
              <div className="nav-link">
                <div className="nav-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </div>
                <span>Dashboard</span>
                <ChevronRight className="chevron-icon" size={18} />
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <div className="nav-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"></path>
                    <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"></path>
                  </svg>
                </div>
                <span>Gudang</span>
                <ChevronRight className="chevron-icon" size={18} />
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <div className="nav-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </div>
                <span>kategori</span>
                <ChevronRight className="chevron-icon" size={18} />
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <div className="nav-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
                <span>Produk</span>
                <ChevronRight className="chevron-icon" size={18} />
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <div className="nav-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <span>Laporan</span>
                <ChevronRight className="chevron-icon" size={18} />
              </div>
            </li>
            <li className="nav-item active">
              <div className="nav-link active">
                <div className="nav-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span>Profile</span>
                <ChevronRight className="chevron-icon" size={18} />
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-title">
            <h1>Selamat Datang, Alexa</h1>
            <p className="date">{formattedDate}</p>
          </div>
          <div className="header-actions">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input type="text" placeholder="Search" className="search-input" />
            </div>
            <div className="notification-icon">
              <Bell size={20} />
            </div>
            <div className="profile-avatar">
              <img src={defaultProfileImage} alt="Profile" />
            </div>
          </div>
        </header>

        {/* Profile Content */}
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar-large">
              <img src={defaultProfileImage} alt="Alexa Rawles" />
            </div>
            <div className="profile-header-info">
              <h2>Alexa Rawles</h2>
              <p>alexarawles@gmail.com</p>
            </div>
            <button className="edit-button">Edit</button>
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your First Name" className="form-control" />
              </div>
              <div className="form-group">
                <label>Nick Name</label>
                <input type="text" placeholder="Your First Name" className="form-control" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender</label>
                <div className="select-container">
                  <input type="text" placeholder="Your First Name" className="form-control" readOnly />
                  <ChevronDown size={20} className="select-icon" />
                </div>
              </div>
              <div className="form-group">
                <label>Country</label>
                <div className="select-container">
                  <input type="text" placeholder="Your First Name" className="form-control" readOnly />
                  <ChevronDown size={20} className="select-icon" />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Language</label>
                <div className="select-container">
                  <input type="text" placeholder="Your First Name" className="form-control" readOnly />
                  <ChevronDown size={20} className="select-icon" />
                </div>
              </div>
              <div className="form-group">
                <label>Time Zone</label>
                <div className="select-container">
                  <input type="text" placeholder="Your First Name" className="form-control" readOnly />
                  <ChevronDown size={20} className="select-icon" />
                </div>
              </div>
            </div>

            <div className="email-section">
              <h3>My email Address</h3>
              <div className="email-item">
                <div className="email-icon">
                  <Mail size={20} />
                </div>
                <div className="email-details">
                  <p className="email">alexarawles@gmail.com</p>
                  <p className="email-time">1 month ago</p>
                </div>
              </div>
              <button className="add-email-btn">
                <Plus size={16} />
                Add Email Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;