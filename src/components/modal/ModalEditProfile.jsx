import React from 'react';
import './ModalEditProfile.css';

const ModalEditProfile = ({ show, onClose, formData, onChange, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Edit Profile</h2>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password (kosongkan jika tidak ingin ganti)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Password baru"
            />
          </div>

          <div className="form-group">
            <label>Konfirmasi Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={onChange}
              placeholder="Konfirmasi password baru"
            />
          </div>

          <div className="form-group">
            <label>Foto Profil</label>
            <input
              type="file"
              name="profile_photo"
              accept="image/*"
              onChange={onChange}
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="btn-primary">Simpan</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditProfile;
