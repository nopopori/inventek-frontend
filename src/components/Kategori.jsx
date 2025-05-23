import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import './Kategori.css';
import ModalKategori from '../components/modal/ModalKategori';

const Kategori = () => {
  const [kategoriData, setKategoriData] = useState([
    
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    namaKategori: '',
    gudang: '',
    deskripsi: ''
  });

  // State untuk edit
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleAddKategori = () => {
    setFormData({
      namaKategori: '',
      gudang: '',
      deskripsi: ''
    });
    setIsEditMode(false);
    setEditId(null);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setIsEditMode(false);
    setEditId(null);
    setFormData({
      namaKategori: '',
      gudang: '',
      deskripsi: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    if (isEditMode && editId) {
      setKategoriData(prev => prev.map(item => 
        item.id === editId 
          ? { ...item, nama_kategori: formData.namaKategori, gudang: formData.gudang, deskripsi: formData.deskripsi }
          : item
      ));
      alert('Kategori berhasil diupdate!');
    } else {
      const newKategori = {
        id: Date.now(),
        nama_kategori: formData.namaKategori,
        gudang: formData.gudang,
        deskripsi: formData.deskripsi
      };
      setKategoriData(prev => [...prev, newKategori]);
      alert('Kategori berhasil ditambahkan!');
    }

    handleCloseModal();
  };

  const handleDelete = (nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus kategori "${nama}"?`)) {
      setKategoriData(prev => prev.filter(item => item.nama_kategori !== nama));
      alert(`Kategori "${nama}" berhasil dihapus.`);
    }
  };

  const handleEdit = (nama) => {
    const kategori = kategoriData.find((item) => item.nama_kategori === nama);
    if (!kategori) return;

    setFormData({
      namaKategori: kategori.nama_kategori,
      gudang: kategori.gudang,
      deskripsi: kategori.deskripsi
    });
    setEditId(kategori.id);
    setIsEditMode(true);
    setShowAddModal(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(kategoriData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = kategoriData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="content-header">
          <h1>Kategori</h1>
          <div className="header-actions">
            <button className="add-btn" onClick={handleAddKategori}>Add Product</button>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama Kategori</th>
                <th>Gudang</th>
                <th>Deskripsi</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama_kategori}</td>
                    <td>{item.gudang}</td>
                    <td>{item.deskripsi}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn" onClick={() => handleEdit(item.nama_kategori)}>
                          ✏️
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(item.nama_kategori)}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>Tidak ada data kategori</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button 
            className="pagination-btn" 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          <button 
            className="pagination-btn" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <ModalKategori
          show={showAddModal}
          onClose={handleCloseModal}
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmitForm}
          isEdit={isEditMode}
        />
      </div>
    </div>
  );
};

export default Kategori;