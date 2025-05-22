import React from 'react';
import '../Gudang.css'; // opsional jika kamu ingin styling terpisah

const ModalGudang = ({ show, onClose, formData, onChange, onFileChange, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Tambah Gudang</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={onSubmit} className="gudang-form">
          <div className="upload-section">
            <div className="upload-area">
              {formData.fotoGudang ? (
                <div className="file-preview">
                  <span className="file-icon">📁</span>
                  <span className="file-name">{formData.fotoGudang.name}</span>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">
                    <div className="upload-main">Tarik Foto Kesini</div>
                    <div className="upload-sub">Telusuri Foto</div>
                  </div>
                </div>
              )}
              <input type="file" accept="image/*" onChange={onFileChange} className="file-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="namaGudang">Nama Gudang</label>
              <input
                type="text"
                id="namaGudang"
                name="namaGudang"
                value={formData.namaGudang}
                onChange={onChange}
                placeholder="Masukkan Nama Gudang"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lokasiGudang">Lokasi Gudang</label>
              <input
                type="text"
                id="lokasiGudang"
                name="lokasiGudang"
                value={formData.lokasiGudang}
                onChange={onChange}
                placeholder="Masukkan Lokasi Gudang"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Buang Perubahan</button>
            <button type="submit" className="submit-btn">Tambah Gudang</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalGudang;
