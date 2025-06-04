import React, { useState, useEffect } from 'react';
import './Laporan.css';
import Sidebar from './sidebar';
import ModalLaporan from '../components/modal/ModalLaporan';
import axios from '../api/axios';

const Laporan = () => {
  const [activeTab, setActiveTab] = useState('masuk');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState(false);

  // Data dummy untuk barang masuk
  const barangMasuk = [
    { nama: 'Maggi', gudang: '₹430', deskripsi: '43 Packets', id: 1 },
    { nama: 'Bru', gudang: '₹257', deskripsi: '22 Packets', id: 2 },
    { nama: 'Red Bull', gudang: '₹405', deskripsi: '36 Packets', id: 3 },
    { nama: 'Bourn Vita', gudang: '₹502', deskripsi: '14 Packets', id: 4 },
    { nama: 'Horlicks', gudang: '₹530', deskripsi: '5 Packets', id: 5 }
  ];

  // Data dummy untuk barang keluar (sama untuk contoh)
  const barangKeluar = [
    { nama: 'Maggi', gudang: '₹430', deskripsi: '43 Packets', id: 1 },
    { nama: 'Bru', gudang: '₹257', deskripsi: '22 Packets', id: 2 },
    { nama: 'Red Bull', gudang: '₹405', deskripsi: '36 Packets', id: 3 },
    { nama: 'Bourn Vita', gudang: '₹502', deskripsi: '14 Packets', id: 4 },
    { nama: 'Horlicks', gudang: '₹530', deskripsi: '5 Packets', id: 5 }
  ];

  const currentData = activeTab === 'masuk' ? barangMasuk : barangKeluar;

  const handleEdit = (id) => {
    console.log('Edit item with id:', id);
  };

  const handleView = (id) => {
    console.log('View item with id:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete item with id:', id);
  };

  return (
    <div className="laporan-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Header Tabs */}
        <div className="content-header">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'masuk' ? 'active' : ''}`}
              onClick={() => setActiveTab('masuk')}
            >
              Barang Masuk
            </button>
            <button 
              className={`tab ${activeTab === 'keluar' ? 'active' : ''}`}
              onClick={() => setActiveTab('keluar')}
            >
              Barang Keluar
            </button>
          </div>

          <div className="header-actions">
            <button 
              className="add-product-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Add Product
            </button>
            <button 
              className="filters-btn"
              onClick={() => setFilters(!filters)}
            >
              Download
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Gudang</th>
                <th>Deskripsi</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.nama}</td>
                  <td>{item.gudang}</td>
                  <td>{item.deskripsi}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(item.id)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleView(item.id)}
                        title="View"
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(item.id)}
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
          <button className="pagination-btn">Previous</button>
          <span className="pagination-info">Page 1 of 10</span>
          <button className="pagination-btn">Next</button>
        </div>
      </div>

      {/* Modal */}
      <ModalLaporan 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Laporan;