import React from 'react';
import './ProfilePage.css';
import { ChevronRight, Search, Bell, ChevronDown, Mail, Plus } from 'lucide-react';
import defaultProfileImage from '../assets/profile.jpg';
import Sidebar from './sidebar';
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
      <Sidebar /> 
        
        

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