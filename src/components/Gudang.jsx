import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import './Gudang.css';
import ModalGudang from '../components/modal/ModalGudang';
import axios from '../api/axios';

const Gudang = () => {
  const [gudangData, setGudangData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    namaGudang: '',
    lokasiGudang: '',
    fotoGudang: null,
  });

  // State untuk edit
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGudang();
  }, []);

  const fetchGudang = async () => {
    const response = await axios.get('/gudang');

    if (Array.isArray(response.data)) {
      setGudangData(response.data);
    } else if (response.data && Array.isArray(response.data.data)) {
      setGudangData(response.data.data);
    } else {
      setGudangData([]);
      console.warn('Data gudang tidak dalam format array yang diharapkan');
    }
  };

  const handleAddGudang = () => {
    setFormData({
      namaGudang: '',
      lokasiGudang: '',
      fotoGudang: null,
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
      namaGudang: '',
      lokasiGudang: '',
      fotoGudang: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, fotoGudang: file }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('nama_gudang', formData.namaGudang);
    form.append('lokasi', formData.lokasiGudang);
    if (formData.fotoGudang) {
      form.append('foto_gudang', formData.fotoGudang);
    }

    if (isEditMode && editId) {
      await axios.post(`/gudang/${editId}?_method=PUT`, form);
      alert('Gudang berhasil diupdate!');
    } else {
      await axios.post('/gudang', form);
      alert('Gudang berhasil ditambahkan!');
    }

    fetchGudang();
    handleCloseModal();
  };

  const handleDelete = async (nama) => {
    const gudang = gudangData.find((item) => item.nama_gudang === nama);
    if (!gudang) return;

    await axios.delete(`/gudang/${gudang.id}`);
    alert(`Gudang "${nama}" berhasil dihapus.`);
    fetchGudang();
  };

  const handleEdit = (nama) => {
    const gudang = gudangData.find((item) => item.nama_gudang === nama);
    if (!gudang) return;

    setFormData({
      namaGudang: gudang.nama_gudang,
      lokasiGudang: gudang.lokasi,
      fotoGudang: null, // Tidak bisa preload file input
    });
    setEditId(gudang.id);
    setIsEditMode(true);
    setShowAddModal(true);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="content-header">
          <h1>Gudang</h1>
          <div className="header-actions">
            <button className="add-btn" onClick={handleAddGudang}>Add Gudang</button>
          </div>
        </div>

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
              {Array.isArray(gudangData) && gudangData.length > 0 ? (
                gudangData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama_gudang}</td>
                    <td>{item.lokasi}</td>
                    <td>
                      {item.foto_gudang ? (
                        <img
                          src={`http://localhost:8000/storage/${item.foto_gudang}`}
                          alt="Foto"
                          width={100}
                        />
                      ) : (
                        'No image'
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn" onClick={() => handleEdit(item.nama_gudang)}>✏️</button>
                        <button className="delete-btn" onClick={() => handleDelete(item.nama_gudang)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>Tidak ada data gudang</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ModalGudang
          show={showAddModal}
          onClose={handleCloseModal}
          formData={formData}
          onChange={handleInputChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmitForm}
          isEdit={isEditMode}
        />
      </div>
    </div>
  );
};

export default Gudang;
