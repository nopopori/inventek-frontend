import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { ChevronRight, Search, Bell, ChevronDown, Mail, Plus } from 'lucide-react';
import defaultProfileImage from '../assets/profile.jpg';
import Sidebar from './sidebar';
import api from '../api/axios';
const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    api.get('/profile')
      .then(res => {
        if (res.data.success) {
          setProfile(res.data.user);
        }
      })
      .catch(err => {
        console.error('Gagal ambil data user:', err);
      });
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <header className="header">
          <div className="header-title">
            <h1>Selamat Datang, {profile.name || 'User'}</h1>
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

        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar-large">
              <img src={defaultProfileImage} alt={profile.name} />
            </div>
            <div className="profile-header-info">
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
            </div>
            <button className="edit-button">Edit</button>
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your First Name"
                  className="form-control"
                  value={profile.name}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Your Email"
                  className="form-control"
                  value={profile.email}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Your Phone"
                  className="form-control"
                  value={profile.phone}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;