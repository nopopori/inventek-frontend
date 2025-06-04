import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { Search, Bell } from 'lucide-react';
import defaultProfileImage from '../assets/profile.jpg';
import Sidebar from './sidebar';
import api from '../api/axios';
import ModalEditProfile from './modal/ModalEditProfile.jsx';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    profile_photo_url: null, // tambah field foto profil URL
  });

  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState('');
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profile_photo: null, // untuk file foto baru
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

  const handleEditClick = () => {
    setEditFormData({
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      profile_photo: null,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_photo') {
      setEditFormData(prev => ({ ...prev, profile_photo: files[0] || null }));
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', editFormData.name);
      formData.append('email', editFormData.email);
      formData.append('phone', editFormData.phone);

      if (editFormData.profile_photo) {
        formData.append('profile_photo', editFormData.profile_photo);
      }
      formData.append('_method', 'PUT');

      const res = await api.post('/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (res.data.success) {
  setProfile(res.data.user);
  setShowModal(false);
  setNotification('Profil berhasil diperbarui!');
  setTimeout(() => setNotification(''), 3000);
      } else {
        console.error('Update gagal:', res.data);
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat update:', error.response?.data || error);
    }
  };

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
              <img
                src={profile.profile_photo_url || defaultProfileImage}
                alt={profile.name}
              />
            </div>
          </div>
        </header>

        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar-large">
              <img
                src={profile.profile_photo_url || defaultProfileImage}
                alt={profile.name}
              />
            </div>
            <div className="profile-header-info">
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
            </div>
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.name}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.email}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.phone}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit */}
      <ModalEditProfile
        show={showModal}
        onClose={() => setShowModal(false)}
        formData={editFormData}
        onChange={handleInputChange}
        onSubmit={handleUpdateSubmit}
      />
      {notification && (
  <div className="notification success">
    {notification}
  </div>
)}

    </div>
    

  );
};

export default ProfilePage;
