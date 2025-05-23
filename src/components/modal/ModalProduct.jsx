import React from 'react';

const ModalProduct = ({ show, onClose, formData, onChange, onFileChange, onSubmit, isEdit }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdit ? 'Edit Produk' : 'Tambah Produk'}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <form className="product-form" onSubmit={onSubmit}>
          {/* Upload Section */}
          <div className="upload-section">
            <div className="upload-area">
              {formData.fotoProduct ? (
                <div className="file-preview">
                  <span className="file-icon">📁</span>
                  <span className="file-name">{formData.fotoProduct.name}</span>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">
                    <div className="upload-main">Tarik Foto Kesini</div>
                    <div className="upload-sub">atau Pilih foto</div>
                  </div>
                </div>
              )}
              <input
                type="file"
                className="file-input"
                accept="image/*"
                onChange={onFileChange}
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="form-row">
            <div className="form-group">
              <label>Nama Produk</label>
              <input
                type="text"
                name="namaProduct"
                value={formData.namaProduct}
                onChange={onChange}
                placeholder="Masukkan Nama Produk"
                required
              />
            </div>
            <div className="form-group">
              <label>Kategori Produk</label>
              <select
                name="kategoriProduct"
                value={formData.kategoriProduct}
                onChange={onChange}
                required
              >
                <option value="">Pilih Kategori Produk</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Pembersih">Pembersih</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Pakaian">Pakaian</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Jumlah</label>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={onChange}
              placeholder="Masukkan Jumlah Produk"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Deskripsi</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={onChange}
              placeholder="Masukkan Deskripsi Produk"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Buang Perubahan</label>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="submit-btn">
              {isEdit ? 'Update Produk' : 'Tambah Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProduct;