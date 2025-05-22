import React, { useState } from 'react';
import Sidebar from './sidebar'; // Pastikan path ini sesuai dengan file Sidebar.jsx milikmu
import './Gudang.css';
import ModalGudang from '../components/modal/ModalGudang';


const Gudang = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    namaGudang: '',
    lokasiGudang: '',
    fotoGudang: null
  });

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
      <Sidebar />

      <div className="main-content">
        <div className="content-header">
          <h1>Gudang</h1>
          <div className="header-actions">
            <button className="add-btn" onClick={handleAddGudang}>Add Gudang</button>
            <button className="filter-btn">Filters</button>
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
              {gudangData.map((item, index) => (
                <tr key={index}>
                  <td>{item.nama}</td>
                  <td>{item.lokasi}</td>
                  <td>{item.foto}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(item.nama)} title="Edit">✏️</button>
                      <button className="delete-btn" onClick={() => handleDelete(item.nama)} title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
          <span className="page-info">Page {currentPage} of 10</span>
          <button className="pagination-btn" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
      </div>

      <ModalGudang
  show={showAddModal}
  onClose={handleCloseModal}
  formData={formData}
  onChange={handleInputChange}
  onFileChange={handleFileChange}
  onSubmit={handleSubmitForm}
/>
    </div>
  );
};

export default Gudang;
