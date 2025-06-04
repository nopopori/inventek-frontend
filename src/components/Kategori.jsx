import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import './Kategori.css';
import ModalKategori from '../components/modal/ModalKategori';
import axios from '../api/axios';

const Kategori = () => {
  const [kategoriData, setKategoriData] = useState([]);
  const [gudangList, setGudangList] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    namaKategori: '',
    idgudang: '',  // gunakan idgudang sebagai properti formData
    deskripsi: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchKategori();
    fetchGudangList();
  }, []);

  const fetchKategori = async () => {
    try {
      const response = await axios.get('/kategori');
      const data = response.data;

      if (Array.isArray(data)) {
        setKategoriData(data);
      } else if (Array.isArray(data.data)) {
        setKategoriData(data.data);
      } else {
        console.error('Format data kategori tidak valid:', data);
        setKategoriData([]);
      }
    } catch (error) {
      console.error('Gagal memuat data kategori:', error);
    }
  };

  const fetchGudangList = async () => {
    try {
      const response = await axios.get('/gudang');
      const data = response.data;

      if (Array.isArray(data)) {
        setGudangList(data);
      } else if (Array.isArray(data.data)) {
        setGudangList(data.data);
      } else {
        console.error('Format data gudang tidak valid:', data);
        setGudangList([]);
      }
    } catch (error) {
      console.error('Gagal memuat data gudang:', error);
    }
  };

  const handleAddKategori = () => {
    setFormData({
      namaKategori: '',
      idgudang: '',
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
      idgudang: '',
      deskripsi: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const payload = {
      nama_kategori: formData.namaKategori,
      idgudang: formData.idgudang,  // Perbaikan di sini
      deskripsi: formData.deskripsi
    };

    try {
      if (isEditMode && editId) {
        await axios.put(`/kategori/${editId}`, payload);
        alert('Kategori berhasil diupdate!');
      } else {
        await axios.post('/kategori', payload);
        alert('Kategori berhasil ditambahkan!');
      }

      fetchKategori();
      handleCloseModal();
    } catch (error) {
      console.error('Gagal menyimpan kategori:', error);
      alert('Terjadi kesalahan saat menyimpan kategori.');
    }
  };

  const handleDelete = async (idkategori) => {
    const kategori = kategoriData.find(item => item.idkategori === idkategori);
    if (!kategori) return;

    if (window.confirm(`Apakah Anda yakin ingin menghapus kategori "${kategori.nama_kategori}"?`)) {
      try {
        await axios.delete(`/kategori/${idkategori}`);
        alert(`Kategori "${kategori.nama_kategori}" berhasil dihapus.`);
        fetchKategori();
      } catch (error) {
        console.error('Gagal menghapus kategori:', error);
        alert('Terjadi kesalahan saat menghapus kategori.');
      }
    }
  };

  const handleEdit = (idkategori) => {
    const kategori = kategoriData.find(item => item.idkategori === idkategori);
    if (!kategori) return;

    setFormData({
      namaKategori: kategori.nama_kategori,
      idgudang: kategori.idgudang || (kategori.gudang ? kategori.gudang.id : ''),
      deskripsi: kategori.deskripsi || ''
    });
    setEditId(kategori.idkategori);
    setIsEditMode(true);
    setShowAddModal(true);
  };

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
            <button className="add-btn" onClick={handleAddKategori}>Add Kategori</button>
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
                currentData.map(item => (
                  <tr key={item.idkategori}>
                    <td>{item.nama_kategori}</td>
                    <td>{item.gudang?.nama_gudang || '-'}</td>
                    <td>{item.deskripsi}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn" onClick={() => handleEdit(item.idkategori)}>✏️</button>
                        <button className="delete-btn" onClick={() => handleDelete(item.idkategori)}>🗑️</button>
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
          gudangList={gudangList}
        />
      </div>
    </div>
  );
};

export default Kategori;
