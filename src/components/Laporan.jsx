import React, { useState, useEffect } from 'react';
import './Laporan.css';
import Sidebar from './sidebar';
import ModalBarangMasuk from '../components/modal/ModalBarangMasuk';
import ModalBarangKeluar from '../components/modal/ModalBarangKeluar';

import axios from '../api/axios';
import { PlusCircle, Download, Trash2 } from 'lucide-react';

const Laporan = () => {
  const [activeTab, setActiveTab] = useState('masuk');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [filters, setFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dataBarangMasuk, setDataBarangMasuk] = useState([]);
  const [dataBarangKeluar, setDataBarangKeluar] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [activeTab, currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'masuk') {
        const response = await axios.get(`/barang-masuk?page=${currentPage}`);
        if (response.data.success) {
          console.log('Barang masuk data:', response.data);
          setDataBarangMasuk(response.data.data);
          setTotalPages(response.data.last_page || 1);
        } else {
          setDataBarangMasuk([]);
          setTotalPages(1);
        }
      } else {
        const response = await axios.get(`/barang-keluar?page=${currentPage}`);
        if (response.data.success) {
          setDataBarangKeluar(response.data.data);
          setTotalPages(response.data.last_page || 1);
        } else {
          setDataBarangKeluar([]);
          setTotalPages(1);
        }
      }
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentData = activeTab === 'masuk' ? dataBarangMasuk : dataBarangKeluar;

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah kamu yakin ingin menghapus item ini?')) return;

    setLoading(true);
    try {
      if (activeTab === 'masuk') {
        await axios.delete(`/barang-masuk/${id}`);
      } else {
        await axios.delete(`/barang-keluar/${id}`);
      }
      fetchData(); // Refresh the data
    } catch (err) {
      console.error('Error Hapus Data:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Gagal Hapus item, Tolong Coba Lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="laporan-container">
      <Sidebar />
      <div className="main-content">
        <div className="content-header">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'masuk' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('masuk');
                setCurrentPage(1);
              }}
            >
              Barang Masuk
            </button>
            <button
              className={`tab ${activeTab === 'keluar' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('keluar');
                setCurrentPage(1);
              }}
            >
              Barang Keluar
            </button>
          </div>
          <div className="header-actions">
            <button
              className="add-product-btn"
              onClick={() => setIsModalOpen(true)}
              disabled={loading}
            >
              <PlusCircle size={16} />
              {activeTab === 'masuk' ? 'Tambah Barang Masuk' : 'Tambah Barang Keluar'}
            </button>
            <button
              className="filters-btn"
              onClick={() => setIsDownloadModalOpen(true)}
              disabled={loading}
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="table-container">
          {loading ? (
            <div className="loading-indicator">Loading...</div>
          ) : currentData.length === 0 ? (
            <div className="no-data-message">Tidak ada data tersedia</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  {activeTab === 'masuk' ? (
                    <>
                      <th>Nama Produk</th>
                      <th>Stock Masuk</th>
                      <th>Tanggal Masuk</th>
                      <th>Gudang</th>
                      <th>Kategori</th>
                      <th>Keterangan</th>
                      <th>Action</th>
                    </>
                  ) : (
                    <>
                      <th>Nama Produk</th>
                      <th>Stock Keluar</th>
                      <th>Tanggal Keluar</th>
                      <th>Alasan Keluar</th>
                      <th>Gudang</th>
                      <th>Kategori</th>
                      <th>Action</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.id}>
                    {activeTab === 'masuk' ? (
                      <>
                        <td>{item.nama_produk || item.produk?.nama || '—'}</td>
                        <td>{item.stock_masuk}</td>
                        <td>{item.tanggal_masuk ? new Date(item.tanggal_masuk).toLocaleDateString() : '—'}</td>
                        <td>{item.nama_gudang || item.produk?.kategori?.gudang?.nama_gudang || '—'}</td>
                        <td>{item.nama_kategori || item.produk?.kategori?.nama_kategori || '—'}</td>
                        <td>{item.keterangan || '—'}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDelete(item.id)}
                              title="Delete"
                              disabled={loading}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{item.nama_produk || item.produk?.nama || '—'}</td>
                        <td>{item.stock_keluar}</td>
                        <td>{item.tanggal_keluar ? new Date(item.tanggal_keluar).toLocaleDateString() : '—'}</td>
                        <td>{item.alasan_keluar || '—'}</td>
                        <td>{item.nama_gudang || item.produk?.kategori?.gudang?.nama_gudang || '—'}</td>
                        <td>{item.nama_kategori || item.produk?.kategori?.nama_kategori || '—'}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDelete(item.id)}
                              title="Delete"
                              disabled={loading}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="pagination">
          <button 
            className="pagination-btn" 
            onClick={handlePrevPage} 
            disabled={currentPage === 1 || loading}
          >
            Previous
          </button>
          <span className="pagination-info">Page {currentPage} of {totalPages}</span>
          <button 
            className="pagination-btn" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages || loading}
          >
            Next
          </button>
        </div>
      </div>

      {activeTab === 'masuk' ? (
        <ModalBarangMasuk 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refreshData={fetchData}
        />
      ) : (
        <ModalBarangKeluar 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          refreshData={fetchData}
        />
      )}


    </div>
  );
};

export default Laporan;