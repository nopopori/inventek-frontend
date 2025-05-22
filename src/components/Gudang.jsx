import React, { useState } from 'react';
import { Home, Package, Menu, Users, LogOut } from 'lucide-react';
import './Gudang.css';

const Gudang = () => {
  const [activeMenu, setActiveMenu] = useState('Gudang');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    namaGudang: '',
    lokasiGudang: '',
    fotoGudang: null
  });

  // Menu items dengan icon yang konsisten dengan Dashboard
  const menuItems = [
    { icon: Home, label: "Dashboard", active: false },
    { icon: Package, label: "Gudang", active: true },
    { icon: Menu, label: "Kategori", active: false },
    { icon: Package, label: "Produk", active: false },
    { icon: Package, label: "Laporan", active: false },
    { icon: Users, label: "Profile", active: false }
  ];

  // Data gudang (sesuai dengan gambar)
  const gudangData = [
    { nama: 'Maggi', lokasi: '₹430', foto: '43 Packets' },
    { nama: 'Bru', lokasi: '₹257', foto: '22 Packets' },
    { nama: 'Red Bull', lokasi: '₹405', foto: '36 Packets' },
    { nama: 'Bourn Vita', lokasi: '₹502', foto: '14 Packets' },
    { nama: 'Horlicks', lokasi: '₹530', foto: '5 Packets' },
    { nama: 'Harpic', lokasi: '₹605', foto: '10 Packets' },
    { nama: 'Ariel', lokasi: '₹408', foto: '23 Packets' },
    { nama: 'Scotch Brite', lokasi: '₹359', foto: '43 Packets' },
    { nama: 'Coca cola', lokasi: '₹205', foto: '41 Packets' },
  ];

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    // Implementasi logout
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      alert('Logout berhasil!');
      // Redirect ke halaman login atau clear session
    }
  };

  const handleAddGudang = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      namaGudang: '',
      lokasiGudang: '',
      fotoGudang: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      fotoGudang: file
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Gudang berhasil ditambahkan!');
    handleCloseModal();
  };

  const handleEdit = (nama) => {
    alert(`Edit ${nama}`);
  };

  const handleDelete = (nama) => {
    alert(`Delete ${nama}`);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
          <div className="logo">
            <div className="logo-icon">D</div>
            <span className="logo-text">Dashboard</span>
          </div>

        <nav className="nav-menu">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className={`nav-item ${item.label === activeMenu ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.label)}
              >
                <IconComponent className="nav-icon" size={16} />
                <span>{item.label}</span>
                <span className="nav-arrow">›</span>
              </div>
            );
          })}
          
          {/* Logout Menu */}
          <div className="logout-section">
                    <button onClick={handleLogout} className="logout-btn">
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h1>Gudang</h1>
          <div className="header-actions">
            <button className="add-btn" onClick={handleAddGudang}>
              Add Gudang
            </button>
            <button className="filter-btn">
              Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama Gudang</th>
                <th>Lokasi</th>
                <th>Foto Gudang</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {gudangData.map((item, index) => (
                <tr key={index}>
                  <td>{item.nama}</td>
                  <td>{item.lokasi}</td>
                  <td>{item.foto}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(item.nama)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(item.nama)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button 
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <span className="page-info">Page 1 of 10</span>
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal Tambah Gudang */}
      {showAddModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tambah Gudang</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <form onSubmit={handleSubmitForm} className="gudang-form">
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                  />
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    placeholder="Masukkan Lokasi Gudang"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Buang Perubahan
                </button>
                <button type="submit" className="submit-btn">
                  Tambah Gudang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gudang;