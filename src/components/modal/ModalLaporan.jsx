import React, { useState } from 'react';

import '../../components/Laporan.css';

const ModalLaporan = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    namaBarang: '',
    gudang: '',
    deskripsi: '',
    kategori: '',
    harga: '',
    stok: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Di sini nanti akan connect ke backend
    onClose();
    // Reset form
    setFormData({
      namaBarang: '',
      gudang: '',
      deskripsi: '',
      kategori: '',
      harga: '',
      stok: ''
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form
    setFormData({
      namaBarang: '',
      gudang: '',
      deskripsi: '',
      kategori: '',
      harga: '',
      stok: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Tambah Produk Baru</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="namaBarang">Nama Barang *</label>
              <input
                type="text"
                id="namaBarang"
                name="namaBarang"
                value={formData.namaBarang}
                onChange={handleInputChange}
                required
                placeholder="Masukkan nama barang"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="kategori">Kategori *</label>
              <select
                id="kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih kategori</option>
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="elektronik">Elektronik</option>
                <option value="pakaian">Pakaian</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gudang">Gudang *</label>
              <select
                id="gudang"
                name="gudang"
                value={formData.gudang}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih gudang</option>
                <option value="gudang-a">Gudang A</option>
                <option value="gudang-b">Gudang B</option>
                <option value="gudang-c">Gudang C</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="harga">Harga *</label>
              <input
                type="number"
                id="harga"
                name="harga"
                value={formData.harga}
                onChange={handleInputChange}
                required
                placeholder="0"
                min="0"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="stok">Stok *</label>
              <input
                type="number"
                id="stok"
                name="stok"
                value={formData.stok}
                onChange={handleInputChange}
                required
                placeholder="0"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="deskripsi">Deskripsi</label>
              <input
                type="text"
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                placeholder="Deskripsi produk (opsional)"
              />
            </div>
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-submit"
            >
              Tambah Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalLaporan;