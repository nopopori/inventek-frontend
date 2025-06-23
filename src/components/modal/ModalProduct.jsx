// src/pages/modal/ModalProduct.jsx
import React, { useEffect, useState } from 'react';
import './ModalProduct.css';

const ModalProduct = ({
  show,
  onClose,
  formData,
  onChange,
  onFileChange,
  onSubmit,
  isEditMode,
  kategoriList,
  gudangList
}) => {
  const [filteredKategori, setFilteredKategori] = useState([]);

  // Filter kategori setiap kali formData.idgudang berubah
  useEffect(() => {
    if (formData.idgudang) {
      const filtered = kategoriList.filter(k => k.idgudang?.toString() === formData.idgudang.toString());
      setFilteredKategori(filtered);
    } else {
      setFilteredKategori([]);
    }
  }, [formData.idgudang, kategoriList]);

  if (!show) return null;

  const handleFileClick = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Produk' : 'Tambah Produk'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={onSubmit} encType="multipart/form-data" className="modal-form">
          <div className="form-content">
            {/* File Upload Section */}
            <div className="file-upload-section">
              <div className="file-upload-area" onClick={handleFileClick}>
                {formData.foto_produk ? (
                  <div className="file-preview">
                    <img 
                      src={URL.createObjectURL(formData.foto_produk)} 
                      alt="Preview" 
                      className="preview-image"
                    />
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">📷</div>
                    <p className="upload-text">Tarik Foto Kesini</p>
                    <p className="upload-subtext">atau</p>
                    <span className="upload-link">Telusuri foto</span>
                  </div>
                )}
              </div>
              <input
                id="file-input"
                type="file"
                name="foto_produk"
                accept="image/*"
                onChange={onFileChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* Form Fields */}
            <div className="form-fields">
              <div className="field-group">
                <label htmlFor="nama">Nama Produk</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={onChange}
                  placeholder="Masukkan nama produk"
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="idgudang">Gudang</label>
                <select
                  id="idgudang"
                  name="idgudang"
                  value={formData.idgudang || ''}
                  onChange={onChange}
                  required
                >
                  <option value="">Pilih Gudang</option>
                  {gudangList.map((g, index) => (
                    <option key={g.id ?? index} value={g.id?.toString() ?? ''}>
                      {g.nama_gudang || 'Gudang Tidak Diketahui'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="idkategori">Kategori</label>
                <select
                  id="idkategori"
                  name="idkategori"
                  value={formData.idkategori || ''}
                  onChange={onChange}
                  required
                  disabled={!formData.idgudang} // Disable kalau belum pilih gudang
                >
                  <option value="">Pilih Kategori</option>
                  {filteredKategori.length > 0 ? (
                    filteredKategori.map((k, index) => (
                      <option key={k.idkategori ?? index} value={k.idkategori?.toString() ?? ''}>
                        {k.nama_kategori || 'Kategori Tidak Diketahui'}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>Tidak ada kategori untuk gudang ini</option>
                  )}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={onChange}
                  min="0"
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="keterangan">Keterangan</label>
                <textarea
                  id="keterangan"
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={onChange}
                  rows="3"
                  placeholder="Deskripsi produk (opsional)"
                />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="masukkan_ke_barang_masuk"
                    checked={formData.masukkan_ke_barang_masuk || false}
                    onChange={onChange}
                  />
                  <span className="checkmark"></span>
                  Masukkan ke Barang Masuk
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="submit-btn">
              {isEditMode ? 'Update Produk' : 'Tambah Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProduct;