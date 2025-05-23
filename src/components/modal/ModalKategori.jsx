import React from 'react';

const ModalKategori = ({ show, onClose, formData, onChange, onSubmit, isEdit }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdit ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form className="kategori-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label>Nama Kategori</label>
            <input
              type="text"
              name="namaKategori"
              value={formData.namaKategori}
              onChange={onChange}
              placeholder="Masukkan nama kategori"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Gudang</label>
              <input
                type="text"
                name="gudang"
                value={formData.gudang}
                onChange={onChange}
                placeholder="Masukkan gudang"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Deskripsi</label>
              <input
                type="text"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={onChange}
                placeholder="Masukkan deskripsi"
                required
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Buang Perubahan
            </button>
            <button type="submit" className="submit-btn">
              {isEdit ? 'Update' : 'Tambah Kategori'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalKategori;